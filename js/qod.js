(function($) {
  let lastPage = '';

  $('#new-quote-button').on('click', function(event) {
    event.preventDefault();
    // getRandomQuote();

    lastPage = document.URL;

    $.ajax({
      method: 'GET',
      url:
        qod_vars.rest_url +
        '/wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1'
    })
      .done(function(data) {
        $('.source').empty();
        let postObject = data[0]; //.shift() and [0] is the same
        const postSource = data[0];
        const postUrl = data[0];
        $('.entry-content').html(postObject.content.rendered);
        $('.entry-title').html(postObject.title.rendered);
        function addsource() {
          const s = data[0]._qod_quote_source;
          if (s !== '') {
            $('.source').html(
              `<a href="${postUrl._qod_quote_source_url}">${postSource._qod_quote_source}</a>`
            );
          } else {
          }
        }
        addsource();
        const post = data[0];

        history.pushState(null, null, qod_vars.home_url + '/' + post.slug);
        // history.pushState(null, null, post.slug);

        // append the quote to the DOM
      })
      .fail(function(error) {
        console.log('an error occurred', error);
      });
    $(window).on('popstate', function() {
      window.location.replace(lastPage);
      // 2: post a new quote using the post method
      // using a form to submit a quote so a .submit event
    });
  });
})(jQuery);

// IIFE Immediatley Invoked Function Expression
// Invoked also means calling a function or just running a function
(function($) {
  $('#submit-btn').on('click', function(event) {
    event.preventDefault();
    console.log('submit');
    $.ajax({
      method: 'post',
      url: window.qod_vars.rest_url + 'wp/v2/posts/',
      data: {
        title: $('#quote-author').val(),
        content: $('#quote-content').val(),
        _qod_quote_source: $('#quote-source').val(),
        _qod_quote_source_url: $('#quote-source-url').val()
      },
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-WP-Nonce', window.qod_vars.wpapi_nonce);
      }
    })
      .fail(function() {
        alert('fail');
      })
      .done(function(response) {
        alert('Success! Comments are closed for this post.');
      });
  });
})(jQuery);
