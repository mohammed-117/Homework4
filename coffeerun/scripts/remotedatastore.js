(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error("No remote URL supplied.");
    }
    this.serverUrl = url;
  }

  RemoteDataStore.prototype.add = function(key, value) {

    return $.ajax(this.serverUrl, {   //ajax return a deferred
      
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(value),  // string conversion for data add
      success: function() {

        console.log("Add successful");
      },
      error: function(serverResponse) {
        console.log(serverResponse.responseMsg);
      }
    });
  };

  RemoteDataStore.prototype.getAll = function() {
    return $.ajax(this.serverUrl, {   //ajax return a deferred
      type: "GET",

      success: function() {

        console.log("Get all successful");
      },
      error: function(fr) {

        console.log(fr.responseMsg);
      }
    });
  };

  RemoteDataStore.prototype.get = function(key) {
    return $.ajax(this.serverUrl + "?emailAddress=" + key, {   //ajax return a deferred
      type: "GET",
      success: function(order) {

        console.log("Get successful for:" + order);
      },
      error: function(fr) {
        console.log(fr.responseMsg);
      }
    });
  };

  RemoteDataStore.prototype.remove = function(key) {
    var url = this.serverUrl;
    return $.ajax(url + "?emailAddress=" + key, {  //ajax return a deferred
      type: "GET",
      success: function(serverResponse) {
		  
        console.log(serverResponse[0]["id"]);
		
        var id = serverResponse[0]["id"];
        $.ajax(url + "/" + id, {   // individual id case patched with url to be deferred
          type: "DELETE",
		  
          success: function(serverResponse) {
            console.log(serverResponse);
          },
          error: function(serverResponse) {
            console.log(serverResponse);
          }
        });
      },
      error: function(serverResponse) {    // handle  server response error case
        console.log("Not successful" + serverResponse.responseMsg);
      }
    });
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
