const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const app = express();

app.get("/", async (req, res) => {
    let token = await jsonwebtoken.sign(
        {
        date: new Date(),
    }, "gdfgdafgdfgfadgdfgdfgfdagaghhhdthhbbd",
    {
        expiresIn : 60,
    }
    );
    console.log(token);
    res.json({
        message: "Success0",
        token
    })
});

app.get("/check/:token", async (req, res) => {
    console.log(req.params.token);
    let token = req.params.token;
    try {
        let tokenresult = await jsonwebtoken.verify(
            token,
            "gdfgdafgdfgfadgdfgdfgfdagaghhhdthhbbd",
           
        );

        console.log(tokenresult);
        if (tokenresult) {
            res.json({
                message: "Success3",
                date : new Date (tokenresult.date).getDate()
            });
            
        } else {
            res.status(500).json({
                message: "SOmeting Gone Wrong",
            });
        }

    } catch (error) {
        res.status(401).json({
            message: "Error",
        });
    }

});
app.listen(3000, () => {
    console.log("Server Listening in PORT 3000")
})