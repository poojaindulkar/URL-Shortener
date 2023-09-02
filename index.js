//import necessary packages
import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

// Create an Express app
const app=express();
const port = 3000;


// Configure middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Define the Bitly API URL
const API_URL="https://api-ssl.bitly.com/v4/shorten";

//Add your own bearer token.
const BearerToken="d4160361c0036843770ce08c9bc5e89c5fdefa10";

// Configure headers for API requests
const config={
    headers : {
        Authorization: `Bearer ${BearerToken}`,
        "Content-Type": 'application/json'
        
    },
};

// Define a route for the home page
app.get("/", (req, res) => {
    res.render("index.ejs");
  });


// Define a route for handling URL shortening requests
app.post('/short-URL',async(req,res)=>{
    // Create data to be sent in the POST request, since Bitly API require JSON object
    const data={
        long_url:req.body.URL
    }
    try{
        // Make a POST request to the Bitly API to shorten the URL
        const result=await axios.post(
            API_URL,  
            data,
            config,
            
        )
        
        // Render the index.ejs template with the shortened URL data
        res.render("index.ejs",{
            content:result.data,
        })
    }catch(error){
        console.log(error);
    }
    
});


// Render the index.ejs template with the shortened URL data
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});
