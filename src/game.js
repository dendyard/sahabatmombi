document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid')
    const width = 13
    const heght = 6
    var squares = []
    var acttile = [0, 0];

    var cl1 = '';
    var cl2 = '';

    var valcard;

    var tiles = [
[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
];

    var cardsset = [];

    //build card set
    let pairset = (width * heght) / 2;
    let paircard = 1;

    
    //cardsset = [];

    const cards = [
    '',
    'assets/k1.png',
    'assets/k2.png',
    'assets/k3.png',
    'assets/k4.png',
    'assets/k5.png',
    'assets/k6.png',
    'assets/k7.png',
    'assets/k8.png',
    'assets/k9.png',
    'assets/k10.png',
        
]
    for (let g = 0; g < pairset; g++) {
        cardsset.push(paircard);
        cardsset.push(paircard);
        paircard++;

        if (paircard >= (cards.length)) {
            paircard = 1;
        }
    }
    
    console.log(cards.length);

    function Shuffle(o) {
        for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };


    Shuffle(cardsset);


    function createBoard() {

        let tcount = 0;
        world = tiles;
        cardfaceshuffle = 0;

        for (var i = 0; i < width; i++) {
            //Col
            for (var j = 0; j < heght; j++) {
                //Row
                const square = document.createElement('div')

                square.style.backgroundImage = 'url(' + cards[cardsset[cardfaceshuffle]] + ')'
                tiles[j][i] = cardsset[cardfaceshuffle];

                cardfaceshuffle++

             
                square.setAttribute('id', 'tiles_' + j + '_' + i)
                square.setAttribute('y', j)
                square.setAttribute('x', i)

                grid.appendChild(square)
                squares.push(square)

            }
            tcount++

            if (tcount > 9) {
                tcount = 0
            }
        }

        console.log(tiles);
    }


    createBoard();

    TweenLite.to(gameover, 0, {
                                    scale: 0,
                                    ease: Back.easeOut,
                                });
    
    pp.addEventListener('click', () => {
        location.reload();
    })
    
    mulai.addEventListener('click', function () {
        logogame.style.display = 'none';
        //gametimer.style.display = 'block';
        //setInterval(setTime, 1000);
        
        bgsfx.play();
        openFullscreen();
        TweenLite.to(mulai, 0.5, {
            scale: 0,
            ease: Sine.easeOut
        });

        TweenLite.to(boardgrid, 1, {
            opacity: 1,
            ease: Sine.easeOut,
            delay: 1.5
        });
    })
    squares.forEach(square => square.addEventListener('click', tileclick));

    function openFullscreen() {
        var elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            /* IE11 */
            elem.msRequestFullscreen();
        }
    }

    function closeFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            /* IE11 */
            document.msExitFullscreen();
        }
    }


    function tileclick(e) {

        let yvalue = parseInt(e.target.getAttribute('y'));
        let xvalue = parseInt(e.target.getAttribute('x'));

        let tvalue = tiles[parseInt(yvalue)][parseInt(xvalue)];


        if (tvalue != 0 && tvalue != 50) {

            e.target.style.zIndex = 100;

            if (cl1 == '') {
                cl1 = e.target.id;
                pathStart = [yvalue, xvalue];

                TweenLite.to(e.target, 0.3, {
                    scale: 2,
                    ease: Back.easeOut
                });
                valcard = tvalue;

                acttile[0] = e.target;
                acttile[0].style.pointerEvents = 'none';
                pilih.currentTime = 0;
                pilih.play();
            } else {
                if (cl2 == '') {
                    console.log('valcard : ' + valcard);
                    console.log('tvalue : ' + tvalue);
                    acttile[1] = e.target;
                    acttile[1].style.pointerEvents = 'none';
                    //only do check if the card are same
                    if (valcard == tvalue) {

                        cl2 = e.target.id;

                        pathEnd = [parseInt(yvalue), parseInt(xvalue)];
                        currentPath = findPath(world, pathStart, pathEnd);

                        TweenLite.to(e.target, 0.3, {
                            scale: 2,
                            ease: Back.easeOut
                        });

                        if (redraw() > 0) {
                            //Hide Match tiles
                            acttile[0].style.opacity = '0';
                            acttile[1].style.opacity = '0';
                            tiles[parseInt(acttile[0].getAttribute('y'))][parseInt(acttile[0].getAttribute('x'))] = 0;
                            tiles[parseInt(acttile[1].getAttribute('y'))][parseInt(acttile[1].getAttribute('x'))] = 0;
                            jadi.currentTime = 0;
                            jadi.play();

                            if (!checkIfWeWin()) {
                                TweenLite.to(gameover, 0.3, {
                                    scale: 1,
                                    ease: Back.easeOut,
                                });
                                gameover.style.display = 'block';
                            }
                        } else {
                            // restore value
                            world[pathEnd[0]][pathEnd[1]] = tempEnd;
                            pilih.currentTime = 0;
                            pilih.play();
                        }

                        cl1 = '';
                        cl2 = '';
                        valcard = '';
                        TweenLite.to(acttile[0], 0.3, {
                            scale: 1,
                            ease: Back.easeOut,
                            delay: 0.5
                        });
                        TweenLite.to(acttile[1], 0.3, {
                            scale: 1,
                            ease: Back.easeOut,
                            delay: 0.5
                        });
                        acttile[0].style.zIndex = 1;
                        acttile[1].style.zIndex = 1;
                    } else {
                        TweenLite.to(acttile[0], 0.3, {
                            scale: 1,
                            ease: Back.easeOut
                        });
                        cl1 = '';
                        cl2 = '';

                        valcard = '';
                        acttile[0].style.zIndex = 1;
                        acttile[1].style.zIndex = 1;

                    }
                }
                acttile[0].style.pointerEvents = 'auto';
                acttile[1].style.pointerEvents = 'auto';
            }
        }
    }


    function checkIfWeWin() {
        let notwin = false;
        for (var i = 0; i < width; i++) {
            if (!notwin) {
                for (var j = 0; j < heght; j++) {
                    console.log('check array : ' + tiles[j][i]);
                    if (tiles[j][i] != 0 && tiles[j][i] != 10) {
                        notwin = true;
                        break;
                    }
                }
            } else {
                notwin = true;
                break;
            }
        }
        return notwin;

    }

    //console.log('ora win : ' + checkIfWeWin())
    //checkIsThereAway();
    function checkIsThereAway(c) {
        var cc = c.split(',');

        let ptx = parseInt(cc[0]);
        let pty = parseInt(cc[1]);
        var canmove = 0;
        console.log('X nya : --> ' + (ptx))
        console.log('Y nya : --> ' + (pty))


        //Is Open Tile
        if (tiles[ptx - 1][pty] != 0) {
            canmove++;
        }
        if (tiles[ptx + 1][pty] != 0) {
            canmove++;
        }

        if (tiles[ptx][pty - 1] != 0) {
            canmove++;
        }
        if (tiles[ptx][pty + 1] != 0) {
            canmove++;
        }

        if (canmove < 4) {
            console.log('Bisa gerak')
        } else {
            console.log('Tidak bisa gerak')
        }

        console.log(canmove);

    }




});
