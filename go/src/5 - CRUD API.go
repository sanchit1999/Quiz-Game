package main

import 
(
   "fmt"
   "github.com/gin-contrib/cors"                        
   "github.com/gin-gonic/gin"
   "github.com/jinzhu/gorm"
   _ "github.com/jinzhu/gorm/dialects/sqlite"           
)

var db *gorm.DB                                        
var err error

type Leaderboard struct 
{
    Username    string `json: "username"`
    Quiz        string `json: "quiz"`
    Score       uint `json"score"`
}

type History struct
{
    Username    string `json: "username"`
    Quiz        string `json: "quiz"`
    Quiz_no     uint `json: "quiz_no"`
    Score       uint `json: "score"`
}
type User struct 
{
   ID           uint `json:"id"`
   FirstName    string `json:"firstname"`
   LastName     string `json:"lastname"`
   Username     string `json:"username"`
   Password     string `json:"password"`
}

type Question struct
{
    Quiz            string `json:"quiz"`
    QuizNo          uint `json:"quiz_no"`
    QuestionQuiz    string `json:"question"`
    OptionA         string `json:"option_a"`
    OptionB         string `json:"option_b"`
    OptionC         string `json:"option_c"`
    OptionD         string `json:"option_d"`
    CorrectA        uint `json:"c_a"`
    CorrectB        uint `json:"c_b"`
    CorrectC        uint `json:"c_c"`
    CorrectD        uint `json:"c_d"`
}

type Score struct 
{
    Quiz        string `json: "quiz"`
    Quiz_no     uint `json: "quiz_no"`
    Score       uint `json: "score"`
    UserName    string `json: "username"`
}

func main() {

   db, err = gorm.Open("sqlite3", "./gorm.db")
   if err != nil {
      fmt.Println(err)
   }
   defer db.Close()

   db.AutoMigrate(&User{})
   db.AutoMigrate(&Question{})
   db.AutoMigrate(&Score{})
   db.AutoMigrate(&History{})
   db.AutoMigrate(&Leaderboard{})

   r := gin.Default()
   
   r.POST("/lboard", AddLeaderBoard)
   r.GET("/ghistory", GetHistory)
   r.POST("/history", AddHistory)
   r.POST("/score", AddScore)
   r.POST("/signup", Signup)
   r.POST("/login", Login)
   r.POST("/viewusers", Getusers)
   r.POST("/viewquiz", Getques)
   r.GET("/users", Getusers)
   r.GET("/quizques/:quiz/:quiz_no", QQues)
   r.GET("/qu/:quiz/:quiz_no/:option_a", NQQues)
   r.GET("/questions", Getques)
   r.POST("/createquiz", CreateQuiz)
   r.DELETE("/users/:id", DeleteUsers)
   r.DELETE("/questions/:option_a", DeleteQuiz)
   r.DELETE("/del/:quiz/:quiz_no", DQuiz)
   r.GET("/leaderboard", GetLeaderBoard)
   r.PUT("/ques/:quiz/:quiz_no/:option_a", UpdateQues)
   r.Use((cors.Default()))
   r.Run(":8080")                                          
}

func Signup(c *gin.Context) {
    var user User
    var temp User
    c.BindJSON(&user)
    db.Where("username = ?", user.Username).Find(&temp)
    if(temp != User{}) {
        c.Header("access-control-allow-origin", "*")
        c.JSON(350, user)
    }else{
        if(user.FirstName == "" || user.LastName == "" || user.Username == "" || user.Password == "") {
            c.Header("access-control-allow-origin", "*")
            c.JSON(200, user)    
        }else{
            db.Create(&user)
            c.Header("access-control-allow-origin", "*")
            c.JSON(200, user)
        }        
    }  
}

func Getusers(c *gin.Context) {
    var user []User
    if err := db.Find(&user).Error; err != nil {
        fmt.Println(err)
        c.AbortWithStatus(404)
    }else{
        c.Header("access-control-allow-origin", "*")
        c.JSON(200, user)
    }
}

func Login(c *gin.Context) {
    var user User
    var temp User
    c.BindJSON(&user)
    db.Where("username = ? and password = ?", user.Username, user.Password).Find(&temp)
    if(temp != User{}) {
        c.Header("access-control-allow-origin", "*")
        c.JSON(200, user)
    }else {
        c.Header("access-control-allow-origin", "*")
        c.JSON(300, user)
    }
}

func CreateQuiz(c *gin.Context) {
    var nquiz Question
    c.Header("access-control-allow-origin", "*")
    c.BindJSON(&nquiz)
    if(nquiz.QuestionQuiz == "" || nquiz.OptionA == "" || nquiz.OptionB == "" || nquiz.OptionC == "" || nquiz.OptionD == "") {
        c.JSON(300, nquiz)
    }else{
        db.Create(&nquiz)
        c.JSON(200, nquiz)
    }
}

func DeleteQuiz(c *gin.Context) {
   ques := c.Params.ByName("option_a")
   var nquiz Question
   db.Where("option_a = ?",ques).Delete(&nquiz)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, gin.H{"id #" + ques: "deleted"})
}

func DeleteUsers(c *gin.Context) {
    id := c.Params.ByName("id")
    var user User
    db.Where("id = ?", id).Delete(&user)
    c.Header("access-control-allow-origin", "*")
    c.JSON(200, gin.H{"id #" + id: "deleted"})
 }

 func DQuiz(c *gin.Context) {
     qu := c.Params.ByName("quiz")
     qno := c.Params.ByName("quiz_no")
     var temp Question
     db.Where("quiz = ? and quiz_no = ?", qu, qno).Delete(&temp)
     c.Header("access-control-allow-origin", "*")
     c.JSON(200, gin.H{"id #" + qu: "deleted"})
 }

 func QQues(c *gin.Context) {
    quiz := c.Params.ByName("quiz")
    quiz_no := c.Params.ByName("quiz_no")
    var temp []Question
    db.Select("*").Where("quiz = ? and quiz_no = ?", quiz, quiz_no).Find(&temp)
    c.Header("access-control-allow-origin", "*")
    c.JSON(200, temp)    
}

func AddScore (c *gin.Context) {
    var s1 Score
    var s2 Score
    c.BindJSON(&s1)
    db.Where("user_name = ? and quiz = ? and quiz_no = ?", s1.UserName, s1.Quiz, s1.Quiz_no).Find(&s2)
    if(s2 != Score{}) {
        if(s1.Score > s2.Score) {
            db.Where("user_name = ? and quiz = ? and quiz_no = ?", s1.UserName, s1.Quiz, s1.Quiz_no).Delete(&Score{})
            db.Create(&s1)
            c.Header("access-control-allow-origin", "*")
            c.JSON(200, s1)
        }else{
            c.Header("access-control-allow-origin", "*")
            c.JSON(350, s1)
        }
    }else{
        db.Create(&s1)
        c.Header("access-control-allow-origin", "*")
        c.JSON(200, s1)
    }
}

func Getques(c *gin.Context) {
    var nquiz []Question
    if err := db.Find(&nquiz).Error; err != nil {
        fmt.Println(err)
        c.AbortWithStatus(404)
    }else{
        c.Header("access-control-allow-origin", "*")
        c.JSON(200, nquiz)
    }
}

func AddHistory(c *gin.Context) {
    var h1 History
    c.BindJSON(&h1)
    db.Create(&h1)
    c.Header("access-control-allow-origin", "*")
    c.JSON(200, h1)
}

func GetHistory(c *gin.Context) {
    var temp []History
    if err := db.Find(&temp).Error; err != nil {
        fmt.Println(err)
        c.AbortWithStatus(404)
    }else{
        c.Header("access-control-allow-origin", "*")
        c.JSON(200, temp)
    } 
}

func AddLeaderBoard(c *gin.Context) {
    var l1 Leaderboard
    var l2 Leaderboard
    c.BindJSON(&l1)
    db.Where("username = ? and quiz = ?", l1.Username, l1.Quiz).Find(&l2)
    if(l2 != Leaderboard{}) {
        var t = l2.Score
        db.Where("username = ? and quiz = ?", l1.Username, l1.Quiz).Delete(&Leaderboard{})
        l1.Score += t
        db.Create(&l1)
        c.Header("access-control-allow-origin", "*")
        c.JSON(200, l1)
    }else{
        db.Create(&l1)
        c.Header("access-control-allow-origin", "*")
        c.JSON(200, l1)
    }
}

func GetLeaderBoard(c *gin.Context) {
    var temp []Leaderboard
    if err := db.Find(&temp).Error; err != nil {
        fmt.Println(err)
        c.AbortWithStatus(404)
    }else{
        db.Order("score desc").Find(&temp)
        c.Header("access-control-allow-origin", "*")
        c.JSON(200, temp)
    } 
}

func NQQues(c *gin.Context) {
    quiz := c.Params.ByName("quiz")
    quiz_no := c.Params.ByName("quiz_no")
    option_a := c.Params.ByName("option_a")
    var temp []Question
    db.Select("*").Where("quiz = ? and quiz_no = ? and option_a = ?", quiz, quiz_no, option_a).Find(&temp)
    c.Header("access-control-allow-origin", "*")
    c.JSON(200, temp)    
}

func UpdateQues(c *gin.Context) {
    var temp Question
    option_a := c.Params.ByName("option_a")
    quiz := c.Params.ByName("quiz")
    quiz_no := c.Params.ByName("quiz_no")
    if err := db.Where("quiz= ? and quiz_no = ? and option_a = ?", quiz, quiz_no, option_a).First(&temp).Error; err != nil {
       c.AbortWithStatus(404)
       fmt.Println(err)
    }
    c.BindJSON(&temp)
    db.Save(&temp)
    c.Header("access-control-allow-origin", "*") 
    c.JSON(200, temp)
}