    function checkLoginState() {
      FB.getLoginStatus(function(response) {
        console.log(response)
        console.log(response.status);
        
      });
    }
    
    // This is called with the results from from FB.getLoginStatus().
    function statusChangeCallback(response) {
      console.log('statusChangeCallback');
      console.log(response);

      if (response.status === 'connected') {
        // Logged into your app and Facebook.
        testAPI();
      } else {
        // The person is not logged into your app or we are unable to tell.
        document.getElementById('status').innerHTML = 'Please log ' +
          'into this app.';
      }
    }
      
    // This function is called when someone finishes with the Login
    // Button.  See the onlogin handler attached to it in the sample
    // code below.
    // function checkLoginState() {
    //   FB.getLoginStatus(function(response) {
    //     statusChangeCallback(response);
    //     // console.log('cekcc login state');
        
      // });
    // }
  
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '2071877699726111',
        cookie     : true,  // enable cookies to allow the server to access 
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.8' // use graph api version 2.8
      });
      
      // Now that we've initialized the JavaScript SDK, we call 
      // FB.getLoginStatus().  This function gets the state of the
      // person visiting this page and can return one of three states to
      // the callback you provide.  They can be:
      //
      // 1. Logged into your app ('connected')
      // 2. Logged into Facebook, but not your app ('not_authorized')
      // 3. Not logged into Facebook and can't tell if they are logged into
      //    your app or not.
      //
      // These three cases are handled in the callback function.

      FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
      });

    };

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    // Here we run a very simple test of the Graph API after login is
    // successful.  See statusChangeCallback() for when this call is made.
    function testAPI() {
      console.log('Welcome!  Fetching your information.... ');
    FB.api('/me',{fields:['name','email']},function(profile) {
      console.log(profile)
      axios.post('http://localhost:3000/logins',{nama:profile.name,email:profile.email})
          .then(function (response) {
            // console.log(response.data.token)
            localStorage.setItem("token", response.data.token);
            // console.log(response);
            window.location.href='./bookstore.html'
          })
          .catch(function (error) {
            console.log(error);
          });

        });
    }

    function logOut() {
    FB.logout(function(response) {
      // user is now logged out
      window.location.href='./index.html'
    });
    }
    
