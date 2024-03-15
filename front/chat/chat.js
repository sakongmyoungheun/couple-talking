// 뒤로가기
const back = document.getElementById('back')
back.addEventListener('click', (e)=>{ window.history.back();})

// 질문리스트
const list = document.getElementById('list')
list.addEventListener('click', (e)=>{
    window.location.href = '../list/list.html'
})

// 전송버튼 클릭
const send = document.getElementById('send')
send.addEventListener('click', (e)=> {
    // 전송 버튼 비활성화
    send.disabled = true;
    try {
        const input = document.getElementById('input').value;
        const chatting = document.getElementById('chatting');
        const user = document.createElement('div');
        
        user.className = 'user';
        user.innerHTML = `<div class="contentU">${input}</div>`;
        
        chatting.appendChild(user);
        chatting.scrollTop = chatting.scrollHeight;
        document.getElementById('input').value = '';

        const formData = {
            input: input
        }

        var queryString = window.location.search;
        var params = new URLSearchParams(queryString);
        var dataId = params.get('dataId');

        const jsonData = JSON.stringify(formData)

        if(dataId === 'no'){
            fetch(`http://127.0.0.1:8000/chat_no`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonData
            })
            .then(res => res.json())
            .then(data => {
                const chatting = document.getElementById('chatting');
                const chatbot = document.createElement('div');
                chatbot.className = 'chatbot';
                chatbot.innerHTML = `
                <div class="profile">
                    <div class="imgdiv">
                        <img src="../images/boy.png" alt="roni" class="imgpro">
                    </div>
                </div>
                <div class="chatbox">
                    <div class="name">토니</div>
                    <div class="contentC">${data.prediction}</div>
                </div>`;
                chatting.appendChild(chatbot);
                chatting.scrollTop = chatting.scrollHeight;
            })
        }else if(dataId === 'ok'){
            fetch(`http://127.0.0.1:8000/chat_ok`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        })
        .then(res => res.json())
        .then(data => {
            const chatting = document.getElementById('chatting');
            const chatbot = document.createElement('div');
            chatbot.className = 'chatbot';
            chatbot.innerHTML = `
            <div class="profile">
                <div class="imgdiv">
                    <img src="../images/boy.png" alt="roni" class="imgpro">
                </div>
            </div>
            <div class="chatbox">
                <div class="name">토니</div>
                <div class="contentC">${data.prediction}</div>
            </div>`;
            chatting.appendChild(chatbot);
            chatting.scrollTop = chatting.scrollHeight;
        })
        }

        

        // const formData = {
        //     input: input
        // }
        // const jsonData = JSON.stringify(formData)

        // // AI에게 대답 받아오는 부분을 추가
        // // input 보내기
        // fetch('https://port-0-cbg-project-ghdys32blrzmx1y1.sel5.cloudtype.app/??????????????백엔드 url??????', {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: jsonData
        // })
        // .then(res => res.json())
        // .then(data => {
        //     // 받아온 data 처리하는 부분 innerHTML 해주기
        // })

        
    } catch (error) {
        console.error('에러 발생:', error);
    } finally {
        // 전송 버튼 다시 활성화
        send.disabled = false;
    }
})
