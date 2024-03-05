/*
// 데이터 요청 및 수신
fetch('/api/user-info').then(response => response.json()).then(data => {
  // 새로운 요소 생성 및 데이터 삽입
  const userInfoDiv = document.createElement('div');
  userInfoDiv.innerHTML = `
    <h1>${data.name}</h1>
    <p>${data.role}</p>
    <p>Contact: ${data.contactInfo[0].value}</p>
    <a href="${data.portfolio[0].url}">Portfolio</a>
  `;

  // 요소를 페이지에 추가
  document.getElementById('user-info-container').appendChild(userInfoDiv);
});
*/

function readAndWrite() {
    const pageId = localStorage.getItem("page");

    fetch("../json/" + pageId + ".json")
        .then(response => response.json())
        .then(json => {
            const language = localStorage.getItem("language");
            const contents = json[language];
            const contentsLength = contents.length;

            for (let i = 0; i < contentsLength; i++) {
                const currentContentKeys = Object.keys(contents[i]);

                const sectionElement = document.createElement('div');
                const newClass = currentContentKeys[0];

                sectionElement.classList.add(newClass);
                document.querySelector('.mainContents').appendChild(sectionElement);

                for (let j = 0; j < currentContentKeys.length; j++) {
                    const key = currentContentKeys[j];
                    const value = contents[i][key];

                    if (Array.isArray(value) && value.length > 0) {
                        const spanElement = document.createElement(value[0]);

                        for (let j = 1; j < value.length; j++) {
                            spanElement.innerHTML += value[j]; // span 태그의 내용으로 설정
                        }

                        sectionElement.appendChild(spanElement); // span 태그를 sectionElement에 추가
                    } else {
                        const spanElement = document.createElement('span');
                        spanElement.innerHTML = value; // value가 배열이 아닌 경우, 이전과 같이 처리
                        sectionElement.appendChild(spanElement);
                    }
                }
            }
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
}

loadScript(readAndWrite());
