// To deploy in vercel
{
    "version": 2,
    "builds": [
        {"src":"*.js","use":"@vercel/node"}
    ],
    "routes":[
        {
            "src":"/(.*)",
            "dest":"/"
        }
    ]
}