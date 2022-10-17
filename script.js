var choosebox= document.querySelector(".choosebox");
        var pX = document.querySelector(".pX");
        var pO = document.querySelector(".pO");
        var board = document.querySelector(".board");
        var gbox = document.querySelectorAll("section span");
        var users = document.querySelector(".users");
        var winner = document.querySelector(".winner");
        var text = document.querySelector(".text");
        var rbtn = document.querySelector(".rbtn");
        
        let piX = "cross";
        let piO = "circle";
        let ps = "X";
        let game = "true";

        function pxo(){
                choosebox.classList.add("off"); 
                board.classList.add("on"); 
                users.setAttribute("class", "users user"); //marked
            }
        function poo(){
                choosebox.classList.add("off"); 
                board.classList.add("on");
                users.setAttribute("class", "users act"); //marked
            }
        function gid(nid){
            return document.querySelector(".box" + nid).id; //returning id name
        }
        function see(b1, b2, b3, icon){
            if(gid(b1) == icon && gid(b2) == icon && gid(b3) == icon){
                return true;
            }
        }
        function replay(){
            window.location.reload();
        }
        window.onload = ()=>{
             for (let i = 0; i<gbox.length; i++){ 
                 gbox[i].setAttribute("onclick", "tic(this)");
             }            
        }

        function tic(obj){
             console.log(obj);
             if(users.classList.contains("user")){
                obj.innerHTML = `<i class="${piX}"></i>`;
                users.classList.add("act");
                ps = "X";
                obj.setAttribute("id", ps);
            }else{
                obj.innerHTML = `<i class="${piO}"></i>`; 
                users.classList.add("act");                
                obj.setAttribute("id", ps); //marked
            }
            result();
            board.style.pointerEvents = "none";
            obj.style.pointerEvents = "none";
             let dtime = ((Math.random() * 1000) + 200).toFixed();
             setTimeout(()=>{
                comp(game);
            }, dtime);             
        }
        
        function comp(game){
            if(game){ 
                ps = "X";
            let arr =[];
            for(let i=0; i<gbox.length; i++){
                if(gbox[i].childElementCount == 0){
                    arr.push(i);
                }
            }
            let ranbox = arr[Math.floor(Math.random() * arr.length)]; 
            if(arr.length > 0){
                if(users.classList.contains("user")){
                gbox[ranbox].innerHTML = `<i class="${piO}"></i>`;
                users.classList.remove("act");
                ps = "O";
                gbox[ranbox].setAttribute("id", ps);
                }else{
                gbox[ranbox].innerHTML = `<i class="${piX}"></i>`;
                users.classList.remove("act");
                gbox[ranbox].setAttribute("id", ps);
                }
                result();
            }
            gbox[ranbox].style.pointerEvents = "none";
            board.style.pointerEvents = "auto"; 
            ps="O";
            }
        }

        function result(){
            if(see(1,2,3, ps) || see(4,5,6, ps) || see(7,8,9, ps) || see(1,4,7, ps) || see(2,5,8, ps) || see(3,6,9, ps) || see(1,5,9, ps) || see(3,5,7, ps)){
                game = false;
                comp(game);
                setTimeout(()=>{
                    board.classList.remove("on");
                    winner.classList.add("on");
                }, 700);

                text.innerHTML = `Player <p>${ps}</p> won the game!`;
            }else{
                if(gid(1) != "" && gid(2) != "" && gid(3) != "" && gid(4) != "" && gid(5) != "" && gid(6) != "" && gid(7) != "" && gid(8) != "" && gid(9) != ""){
                    game = false;
                    comp(game);
                setTimeout(()=>{
                    board.classList.remove("on");
                    winner.classList.add("on");
            }, 700);
                text.innerHTML = `Match has been drawn`;
                }
            }
        }
