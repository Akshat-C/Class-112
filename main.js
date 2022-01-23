Webcam.set({
    height: 250,
    width: 250,
    image_format: "png",
    png_quality: 90
});

Webcam.attach("#camera")

function take_img()
{
    Webcam.snap(function(data_uri){
        document.getElementById("results").innerHTML = "<img src="+data_uri+" id='results_img'>"
    });
}

console.log("ml5 version: ", ml5.version);
c = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/WgDxOohmp/model.json", modelLoaded);

function modelLoaded()
{
    console.log("Model is successfully loaded");
}

function speak()
{
    var synth = window.speechSynthesis;
    sd1 = "The first prediction is: " + prediction1 + "and";
    sd2 = "The second prediction is:" + prediction2;
    var utt = new SpeechSynthesisUtterance(sd1 + sd2)
    synth.speak(utt);
}

function result()
{
    img = document.getElementById("results_img");
    c.classify(img, gotResults);
}

function gotResults(error, results){
    if (error)
    {
        console.error(error);
    } else {
        console.log(results);
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
        document.getElementById("emoji1_name").innerHTML = prediction1;
        document.getElementById("emoji2_name").innerHTML = prediction2;

        if (prediction1 == "Happy")
        {
            document.getElementById("emoji1_img").innerHTML = "&#128512;";
        } else if (prediction1 == "Angry")
        {
            document.getElementById("emoji1_img").innerHTML = "&#128545;";
        } else if (prediction1 == "Sad")
        {
            document.getElementById("emoj1_img").innerHTML = "&#128546;"
        } 

        if (prediction2 == "Happy")
        {
            document.getElementById("emoji2_img").innerHTML = "&#128512;";
        } else if (prediction2 == "Angry")
        {
            document.getElementById("emoji2_img").innerHTML = "&#128545;";
        } else if (prediction2 == "Sad")
        {
            document.getElementById("emoji2_img").innerHTML = "&#128546;";
        }
    }
}