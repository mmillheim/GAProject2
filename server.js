const express = require('express');


const app = express();

app.set("port", process.env.PORT || 4000);

app.listen(app.get("port"), () => {
    console.log(`PORT: ${app.get("port")}`)
})