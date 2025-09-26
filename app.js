import express from "express";
import puppeteer from "puppeteer";
import cors from "cors";

const app = express();

app.use(express.json({limit: '50mb'}));
app.use(cors());

app.get("/get",(req,res)=>{
    res.json({message:[{name:"Hello"}]})
});

app.post('/generate-pdf', async (req, res) => {
    const html = req.body.html;

    if (!html) return res.status(400).send('Missing HTML content');

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({ width: 794, height: 1123 });
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
        // format: 'A4',
        width: '794px',        // custom width
        height: '1123px',
        printBackground: true,
        margin: { top: '0px', bottom: '0px', left: '0px', right: '0px' }
    });

    await browser.close();

    // const base64 = pdfBuffer.toString('base64'); // ✅ This is correct

    const base64 = pdfBuffer.toString('base64');

    res.json({ base64 });

    // res.setHeader('Content-Type', 'application/pdf');
    // res.send(pdfBuffer); // Force JSON encoding
});


const port = process.env.PORT || 3030;
app.listen(port, ()=>{
    console.log(`server run at port : ${port}`)
})
