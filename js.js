const stage0 = () => {
    gsap.to(".logo_lay", { paddingTop: "5vw" });
    gsap.to(".sliderImg1", { x: 1 });
    gsap.to(".logo", {
        x: 0,
        scale: 1
    });

    gsap.to("h1", { opacity: 1 });
    gsap.to("h2", { opacity: 1 });
    gsap.to(".btn1", { x: 0 });

    gsap.to(".frame1", {
        opacity: 0
    });

    //-------------------------
    gsap.to(".title1", {
        duration: 0.2,
        x: '100vw',
    });
    gsap.to(".text1", {
        duration: 0.3,
        x: '-100vw'
    });
    gsap.to(".text2", {
        duration: 0.3,
        x: '-100vw'
    });
    gsap.to(".text3", {
        duration: 0.3,
        x: '-100vw'
    });
    gsap.to(".text4", {
        duration: 0.3,
        x: '-100vw'
    });
    gsap.to(".text5", {
        duration: 0.3,
        x: '-100vw'
    });
    gsap.to(".fim1", {
        duration: 0.3,
        x: '-100vw'
    });
    gsap.to(".btn2", {
        duration: 0.3,
        y: '100vw'
    });
}

const stage1 = () => {
    gsap.to(".logo_lay", { padding: 0 });
    gsap.to(".sliderImg1", { x: -500 });
    gsap.to(".logo", {
        x: -120,
        scale: 0.6
    });

    gsap.to("h1", { opacity: 0 });
    gsap.to("h2", { opacity: 0 });
    gsap.to(".btn1", { x: 500 });


    gsap.to(".frame1", {
        opacity: 0.2
    });

    gsap.to(".title1", {
        duration: 0.2,
        x: 0,
    });
    gsap.to(".text1", {
        duration: 0.3,
        x: 0,
        ease: "elastic",
        onComplete: text2
    });
    function text2() {
        gsap.to(".text2", {
            duration: 0.3,
            x: 0,
            ease: "elastic",
            onComplete: text3
        });
    }
    function text3() {
        gsap.to(".text3", {
            duration: 0.3,
            x: 0,
            ease: "elastic",
            onComplete: text4
        });
    }
    function text4() {
        gsap.to(".text4", {
            duration: 0.3,
            x: 0,
            ease: "elastic.out",
            onComplete: text5
        });
    }
    function text5() {
        gsap.to(".text5", {
            duration: 0.3,
            x: 0,
            onComplete: fim1
        });
    }

    function fim1() {
        gsap.to(".fim1", {
            duration: 0.5,
            x: 0,
            onComplete: btn2
        });
    }

    function btn2() {
        gsap.to(".btn2", {
            duration: 1,
            y: 0,
        });
    }
}

const stage2 = () => {

}

const stages = [stage0, stage1, stage2];

document.addEventListener('DOMContentLoaded', () => {

    const displays = document.querySelectorAll('.display');
    displays[0].style.display = 'flex';

    function gerenciadordeDisplays(i) {
        for (let index = 0; index < displays.length; index++) {
            if (index === i) {
                displays[index].style.display = 'flex';
            } else {
                displays[index].style.display = 'none';
            }
        }
    }

    const swipeAreas = document.querySelectorAll('.personalScroll');
    let startY;
    let currentStage = 0;

    swipeAreas.forEach((swipeArea) => {
        swipeArea.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        });

        swipeArea.addEventListener('touchmove', (e) => {
            e.preventDefault(); // Evita o scroll enquanto desliza
        });

        swipeArea.addEventListener('touchend', (e) => {
            const endY = e.changedTouches[0].clientY;
            handleSwipe(startY, endY);
        });
    });

    function handleSwipe(start, end) {
        const threshold = 100; // Distância mínima para considerar um swipe
        const diff = start - end;
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // Swipe para cima
                console.log('Swipe para cima');
                currentStage = Math.min(currentStage + 1, stages.length - 1);
                stages[currentStage]();

            } else {
                // Swipe para baixo
                console.log('Swipe para baixo');
                currentStage = Math.max(currentStage - 1, 0);
                stages[currentStage]();
            }
            console.log(`Current stage: ${currentStage}`);
        }
    }

    // Inicializa a primeira exibição
    //  gerenciadordeDisplays(currentStage);
});
