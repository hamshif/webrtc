/**
 * Created by gideonbar on 31/03/15.
 */


$(document).ready(function()
{
    console.log("typeof Android: ", typeof Android);


    if(typeof Android === 'undefined')
    {
        console.log("not Android app");
    }
    else
    {
        console.log("Android app");
        createRoom.click();

        invite_to_room();
    }
});


function invite_to_room()
{
    var personnel = {};
    try
    {
      personnel = JSON.parse(Android.getPersonnel());
    }
    catch(err) {
//        error_report({"error_report": err.message});
        console.log({"error_report": err.message});
    }


    var invite = {"room":room.getRoomId(), "personnel": personnel};


    try
    {
      Android.showToast(JSON.stringify(invite));
    }
    catch(err) {
        console.log({"error_report": err.message});
    }
}



//var csrftoken;
//
//
//$(document).ready(function()
//{
//    csrftoken = getCookie('csrftoken');  //replaced getCookie1;
//    console.log("csrftoken: ", csrftoken);
//});
//
//
//
//function error_report(report)
//{
//    $.ajax({
//	    url: "/intercom/error_report/",
//	    type: 'POST',
//	    contentType: 'application/json; charset=utf-8',
//	    data: JSON.stringify(report),
//	    dataType: 'json',
//
//	    beforeSend: function(xhr)
//	    {
////			console.log('xhr', xhr);
//
////            console.log('baseMap.tries: ', baseMap.tries)
//
//			xhr.setRequestHeader("X-CSRFToken", csrftoken);
//		},
//	    success: function(json)
//		{
//		  	console.log(JSON.stringify(json));
//
//
//		},
//        error: function (request, status, error)
//        {
//            console.log(error);
//        }
//	});
//
//}


//function invite_to_room()
//{
//    var personnel = {};
//    try
//    {
//      personnel = JSON.parse(Android.getPersonnel());
//    }
//    catch(err) {
//        error_report({"error_report": err.message});
//    }
//
//
//    var invite = {"room":room, "personnel": personnel};
//
//
//    $.ajax({
//	    url: "/intercom/invite_to_room/",
//	    type: 'POST',
//	    contentType: 'application/json; charset=utf-8',
//	    data: JSON.stringify(invite),
//	    dataType: 'json',
//
//	    beforeSend: function(xhr)
//	    {
////			console.log('xhr', xhr);
//
////            console.log('baseMap.tries: ', baseMap.tries)
//
//			xhr.setRequestHeader("X-CSRFToken", csrftoken);
//		},
//	    success: function(json)
//		{
//            var msg = JSON.stringify(json);
//		  	console.log(msg);
//
//            try
//            {
//              Android.showToast(msg);
//            }
//            catch(err) {
//                error_report({"error_report": err.message});
//            }
//
//		},
//        error: function (request, status, error)
//        {
//            console.log(error);
//        }
//	});
//}

