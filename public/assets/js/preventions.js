      /** TO DISABLE PRINTS WHIT CTRL+P **/
      document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key == 'p') {
            alert('This section is not allowed to print or export to PDF');
            e.cancelBubble = true;
            e.preventDefault();
            e.stopImmediatePropagation();
        }
    });

    // TO DISABLE SCREENPRINTS/CAPTURES
    document.addEventListener("keyup", function (e) {
        var keyCode = e.keyCode ? e.keyCode : e.which;
                if (keyCode == 44) stopPrntScr();
    });

      function stopPrntScr() {
          var inpFld = document.createElement("input");
          inpFld.setAttribute("value", ".");
          inpFld.setAttribute("width", "0");
          inpFld.style.height = "0px";
          inpFld.style.width = "0px";
          inpFld.style.border = "0px";
          document.body.appendChild(inpFld);
          inpFld.select();
          document.execCommand("copy");
          inpFld.remove(inpFld);
          alert('Screenshots disabled!');
      }

    //   TO DISABLE RIGHT CLICK OF MOUSE
      window.addEventListener('contextmenu', function (e) {
            alert('Right-click is disabled'); 
            e.preventDefault();
      }, false);