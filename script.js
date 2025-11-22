// DOM 요소
const startBtn = document.getElementById('startSimulation');
const resetBtn = document.getElementById('resetSimulation');
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');

let isSimulationRunning = false;

// 시뮬레이션 시작
startBtn.addEventListener('click', async () => {
    if (isSimulationRunning) return;

    isSimulationRunning = true;
    startBtn.disabled = true;
    startBtn.textContent = '시뮬레이션 진행중...';

    // 초기화
    resetSimulation();

    // Step 1: 서버 FCM 전송
    await animateStep1();

    // Step 2: 크루 기기 수신
    await animateStep2();

    // Step 3: 결과
    await animateStep3();

    startBtn.disabled = false;
    startBtn.textContent = '시뮬레이션 다시 시작';
    isSimulationRunning = false;
});

// 리셋 버튼
resetBtn.addEventListener('click', () => {
    resetSimulation();
    startBtn.textContent = '시뮬레이션 시작';
});

// Step 1 애니메이션
async function animateStep1() {
    step1.classList.add('active');

    const messages = step1.querySelectorAll('.fcm-message');

    for (let i = 0; i < messages.length; i++) {
        await delay(200);
        messages[i].classList.add('show');
    }

    await delay(800);
}

// Step 2 애니메이션
async function animateStep2() {
    step2.classList.add('active');

    const devices = step2.querySelectorAll('.device');

    // 크루 A (사운드2)
    await delay(300);
    devices[0].classList.add('show');
    highlightSound(devices[0], 2);

    await delay(500);

    // 크루 B (무음)
    devices[1].classList.add('show');
    highlightSound(devices[1], 0);

    await delay(500);

    // 크루 C (사운드5)
    devices[2].classList.add('show');
    highlightSound(devices[2], 5);

    await delay(800);
}

// Step 3 애니메이션
async function animateStep3() {
    step3.classList.add('active');

    const resultItems = step3.querySelectorAll('.result-item');

    for (let i = 0; i < resultItems.length; i++) {
        await delay(300);
        resultItems[i].style.opacity = '0';
        resultItems[i].style.transform = 'translateX(-20px)';

        setTimeout(() => {
            resultItems[i].style.transition = 'all 0.5s';
            resultItems[i].style.opacity = '1';
            resultItems[i].style.transform = 'translateX(0)';
        }, 100);
    }
}

// 사운드 하이라이트
function highlightSound(device, soundIndex) {
    const soundElement = device.querySelector('.played-sound');
    if (soundElement) {
        soundElement.style.animation = 'pulse 1s ease-in-out 3';

        // 사운드 재생 시뮬레이션 (시각적 효과)
        if (soundIndex > 0) {
            let count = 0;
            const interval = setInterval(() => {
                soundElement.style.background = count % 2 === 0 ? '#d4edda' : '#28a745';
                soundElement.style.color = count % 2 === 0 ? '#28a745' : 'white';
                count++;

                if (count >= 6) {
                    clearInterval(interval);
                    soundElement.style.background = '';
                    soundElement.style.color = '#28a745';
                }
            }, 300);
        }
    }
}

// 시뮬레이션 리셋
function resetSimulation() {
    // Step 비활성화
    step1.classList.remove('active');
    step2.classList.remove('active');
    step3.classList.remove('active');

    // FCM 메시지 숨기기
    const messages = document.querySelectorAll('.fcm-message');
    messages.forEach(msg => msg.classList.remove('show'));

    // 디바이스 숨기기
    const devices = document.querySelectorAll('.device');
    devices.forEach(device => device.classList.remove('show'));

    // 결과 아이템 초기화
    const resultItems = document.querySelectorAll('.result-item');
    resultItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
    });
}

// 딜레이 함수
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Topic 아이템 호버 효과
const topicItems = document.querySelectorAll('.topic-item.new');
topicItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const soundIndex = item.dataset.sound;
        highlightRelatedItems(soundIndex);
    });

    item.addEventListener('mouseleave', () => {
        removeHighlights();
    });
});

// 채널 아이템 호버 효과
const channelItems = document.querySelectorAll('.channel-item');
channelItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const soundIndex = item.dataset.sound;
        highlightRelatedItems(soundIndex);
    });

    item.addEventListener('mouseleave', () => {
        removeHighlights();
    });
});

// 테이블 행 호버 효과
const tableRows = document.querySelectorAll('#crewTable tr');
tableRows.forEach(row => {
    row.addEventListener('mouseenter', () => {
        const soundIndex = row.dataset.sound;
        highlightRelatedItems(soundIndex);
    });

    row.addEventListener('mouseleave', () => {
        removeHighlights();
    });
});

// 관련 항목 하이라이트
function highlightRelatedItems(soundIndex) {
    // Topic 하이라이트
    const topics = document.querySelectorAll(`.topic-item[data-sound="${soundIndex}"]`);
    topics.forEach(topic => topic.style.boxShadow = '0 0 20px rgba(40, 167, 69, 0.8)');

    // 채널 하이라이트
    const channels = document.querySelectorAll(`.channel-item[data-sound="${soundIndex}"]`);
    channels.forEach(channel => channel.style.boxShadow = '0 0 20px rgba(255, 107, 53, 0.8)');

    // FCM 메시지 하이라이트
    const messages = document.querySelectorAll(`.fcm-message[data-sound="${soundIndex}"]`);
    messages.forEach(msg => msg.style.boxShadow = '0 0 15px rgba(40, 167, 69, 0.8)');

    // 디바이스 하이라이트
    const devices = document.querySelectorAll(`.device[data-sound="${soundIndex}"]`);
    devices.forEach(device => device.style.boxShadow = '0 0 20px rgba(51, 51, 51, 0.8)');

    // 테이블 행 하이라이트
    const rows = document.querySelectorAll(`#crewTable tr[data-sound="${soundIndex}"]`);
    rows.forEach(row => row.style.background = '#fff3cd');
}

// 하이라이트 제거
function removeHighlights() {
    // Topic
    const topics = document.querySelectorAll('.topic-item');
    topics.forEach(topic => topic.style.boxShadow = '');

    // 채널
    const channels = document.querySelectorAll('.channel-item');
    channels.forEach(channel => channel.style.boxShadow = '');

    // FCM 메시지
    const messages = document.querySelectorAll('.fcm-message');
    messages.forEach(msg => msg.style.boxShadow = '');

    // 디바이스
    const devices = document.querySelectorAll('.device');
    devices.forEach(device => device.style.boxShadow = '');

    // 테이블 행
    const rows = document.querySelectorAll('#crewTable tr');
    rows.forEach(row => row.style.background = '');
}

// 체크리스트 진행률 계산
const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
const totalTasks = checkboxes.length;

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateProgress);
});

function updateProgress() {
    const completedTasks = document.querySelectorAll('.checklist input[type="checkbox"]:checked').length;
    const progress = Math.round((completedTasks / totalTasks) * 100);

    console.log(`진행률: ${progress}% (${completedTasks}/${totalTasks})`);

    // 100% 완료 시 축하 메시지
    if (progress === 100) {
        showCongratulations();
    }
}

function showCongratulations() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;

    const message = document.createElement('div');
    message.style.cssText = `
        background: white;
        padding: 50px;
        border-radius: 20px;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    `;

    message.innerHTML = `
        <div style="font-size: 5em; margin-bottom: 20px;">🎉</div>
        <h2 style="font-size: 2em; margin-bottom: 15px; color: #28a745;">축하합니다!</h2>
        <p style="font-size: 1.2em; color: #666;">모든 구현 체크리스트를 완료했습니다!</p>
        <button onclick="this.parentElement.parentElement.remove()" style="
            margin-top: 30px;
            padding: 15px 40px;
            font-size: 1.1em;
            background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
            color: white;
            border: none;
            border-radius: 30px;
            cursor: pointer;
            font-weight: bold;
        ">닫기</button>
    `;

    overlay.appendChild(message);
    document.body.appendChild(overlay);

    // 3초 후 자동 닫기
    setTimeout(() => {
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.5s';
        setTimeout(() => overlay.remove(), 500);
    }, 3000);
}

// 스크롤 애니메이션
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 모든 섹션에 스크롤 애니메이션 적용
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// 페이지 로드 시 헤더 애니메이션
window.addEventListener('load', () => {
    const header = document.querySelector('header');
    header.style.opacity = '0';
    header.style.transform = 'translateY(-30px)';

    setTimeout(() => {
        header.style.transition = 'all 0.8s ease-out';
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';
    }, 100);
});

// 인쇄 기능
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        window.print();
    }
});

console.log('🚑 FCM Topic 사운드 시스템 기획 문서가 로드되었습니다.');
console.log('💡 Tip: Topic/채널/테이블 항목에 마우스를 올려보세요!');
