export function addRipple(event, button_color) {
    var bookmark = event.target;
    var ripple = document.createElement('div');
    ripple.classList.add('ripple');
  
    var newColor =
      bookmark.style.backgroundColor === button_color ? 'white' : button_color;
    ripple.style.backgroundColor = newColor;
  
    var rect = bookmark.getBoundingClientRect();
    ripple.style.left = `${event.clientX - rect.left - 175}px`;
    ripple.style.top = `${event.clientY - rect.top - 175}px`;
  
    bookmark.appendChild(ripple);
  
    setTimeout(() => {
      var ripple = document.createElement('div');
      ripple.classList.add('ripple');
      ripple.style.backgroundColor = 'white';
    
      var rect = bookmark.getBoundingClientRect();
      ripple.style.left = `${event.clientX - rect.left - 175}px`;
      ripple.style.top = `${event.clientY - rect.top - 175}px`;

      bookmark.appendChild(ripple);
    }, 250);
  }