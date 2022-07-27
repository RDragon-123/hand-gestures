//https://teachablemachine.withgoogle.com/models/wVeewhJUg/
prediction_1=""
prediction_2=""
Webcam.set({
   width:350,height:300,image_format:"png",png_quality:90
});
camera=document.getElementById("camera")
Webcam.attach("camera")
function takesnapshot(){
    Webcam.snap(function(data_url){
        document.getElementById("result").innerHTML="<img src='"+data_url+"' id='new_img'>"
    });
}
console.log("ml5 version",ml5.version)
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/wVeewhJUg/model.json",modelLoaded)
function modelLoaded(){
    console.log("Model is Loaded")
}
function speak(){
    var synth=window.speechSynthesis;
    data1="The first prediction is "+prediction_1
    data2="The second prediction is "+prediction_2
    var utter=new SpeechSynthesisUtterance(data1+data2)
    synth.speak(utter)
}
function identifyimage(){
    img=document.getElementById("new_img")
    classifier.classify(img,getResult)
}
function getResult(error,result){
    if (error){
       console.log(error)
    }
    else
{
    console.log (result)
    document.getElementById("result_emotion_name").innerHTML=result[0].label
    document.getElementById("result_emotion_name_2").innerHTML=result[1].label
    prediction_1=result[0].label
    prediction_2=result[1].label
    speak()
    
    if (prediction_1=="Happy"){
        document.getElementById("update_1").innerHTML="&#128522;"
    }
    else if (prediction_1=="Angry"){
        document.getElementById("update_1").innerHTML="&#128545;"
    }
    else if (prediction_1=="Sad"){
        document.getElementById("update_1").innerHTML="&#128532;"
    }
    if (prediction_2=="Happy"){
        document.getElementById("update_2").innerHTML="&#128512;"
    }
    else if (prediction_2=="Angry"){
        document.getElementById("update_2").innerHTML="&#128548;"
    }
    else if (prediction_2=="Sad"){
        document.getElementById("update_2").innerHTML="&#128546;"
    }
}}