$(function() {
    var user = window.location.hash.split("#")[1];
    var personality = window.location.hash.split("#")[2];
    var perLetter = "ABCDE";
    var index = perLetter.indexOf(personality);
    var perName = ["Openness","Conscientiousness","Extraversion","Agreeableness","Neuoticism"];
    var perDesc = ["People who like to learn new things and enjoy new experiences usually score high in openness. Openness includes traits like being insightful and imaginative and having a wide variety of interests.\nApproaching people in a new setting is a simple task.\nExperiencing and exploring new interests is fun.\nDo you ever feel more imaginative, rather than practical?"
                   ,"People that have a high degree of conscientiousness are reliable and prompt. Traits include being organized, methodic, and thorough.\nDo you consider yourself mindful of those around you, including friends, family, and strangers.\nAre first impressions important to you?\nDo you feel more at ease when things are organized?"
                   ,"Extraverts get their energy from interacting with others, while introverts get their energy from within themselves. Extraversion includes the traits of energetic, talkative, and assertive.\nDo you enjoy participating in social gatherings and hanging around friends.\nBeing the center of attention is the best.\nDo you consider yourself action-oriented."
                   ,"These individuals are friendly, cooperative, and compassionate. People with low agreeableness may be more distant. Traits include being kind, affectionate, and sympathetic.\nDo you have an optimistic view of nature?\nAre you friendly and helpful towards others, even strangers?\nIs getting along with others important for you?"
                   ,"Neuroticism is also sometimes called Emotional Stability. This dimension relates to one’s emotional stability and degree of negative emotions. People that score high on neuroticism often experience emotional instability and negative emotions. Traits include being moody and tense.\nWould you agree that you are generally emotionally unstable?\nDo you stress over small things?\nOther people’s words may bug you for many days,weeks, or even years."
                  ];

    $("#personality").append(perName[index]);
    $("#body").html(perDesc[index]);

});
