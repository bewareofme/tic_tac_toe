const gameboard=(()=>{
    let array=[
        {value:null,pos:"y0x1"},
        {value:null,pos:'y0x2'},
        {value:null,pos:'y0x3'},
        {value:null,pos:'y1x1'},
        {value:null,pos:'y1x2'},
        {value:null,pos:'y1x3'},
        {value:null,pos:'y2x1'},
        {value:null,pos:'y2x2'},
        {value:null,pos:'y2x3'},
    ];
    const getArray=()=>array;
    const changeArray=(pos,mark)=>{
        const index = getArray().findIndex((posi) => posi.pos === pos);
        getArray()[index].value=mark;
    }
    const render=(pos,mark)=>{
        const area=document.querySelector(`button[position="${pos}"]`);
        area.textContent=`${mark}`;
    }
    const resetArray=()=>{
        for(let i=0;i<array.length;i++){
            array[i].value=null;
        }
    }
    return{getArray,changeArray,render,resetArray}
})();

const displayController=(()=>{
    let turn=0;
    let gameOver=0;
    let draw=0;
    const getTurn=()=>turn;
    const getGameOver=()=>gameOver;
    const getDraw=()=>draw;
    const turnIncrement=()=>turn+=1;
    const gameEndingCond=(arr)=>{
         gameOver=0;
         draw=0;
        //win,lose cond
        if((arr[0].value===arr[1].value && arr[0].value===arr[2].value && arr[0].value!==null)||
        (arr[3].value===arr[4].value && arr[3].value===arr[5].value && arr[3].value!==null)||
        (arr[6].value===arr[7].value && arr[6].value===arr[8].value && arr[6].value!==null)||
        (arr[0].value===arr[3].value && arr[0].value===arr[6].value && arr[0].value!==null)||
        (arr[1].value===arr[4].value && arr[1].value===arr[7].value && arr[1].value!==null)||
        (arr[2].value===arr[5].value && arr[2].value===arr[8].value && arr[2].value!==null)||
        (arr[0].value===arr[4].value && arr[0].value===arr[8].value && arr[0].value!==null)||
        (arr[2].value===arr[4].value && arr[2].value===arr[6].value && arr[2].value!==null))
        {
            // gameover();
        gameOver=1}
        //draw cond
        if(!gameOver && displayController.getTurn()===9){
            gameOver=1;
            draw=1
        }
        if (gameOver){
            buttons.forEach((button)=>
            button.disabled=true)
        }
    }
    const resetTurn=()=>turn=0;
    const resetGameOver=()=>gameOver=0;
    const resetDraw=()=>draw=0;
    //const turn
    return{gameEndingCond,getTurn,turnIncrement,resetTurn,getGameOver,getDraw,resetGameOver,resetDraw};
    
})();
const player=(mark)=>{
    this.mark=mark;
    return{mark};
}
const buttons=document.querySelectorAll('button[position]')
buttons.forEach((button)=>
button.addEventListener('click',(e)=>{
    displayController.turnIncrement();
    const position= button.getAttribute('position');
    // console.log(displayController.getTurn());
    if(displayController.getTurn()%2===0){
        gameboard.changeArray(position,'x');
        gameboard.render(position,'x');
        displayController.gameEndingCond(gameboard.getArray());
        button.classList.add('x');

        if(displayController.getGameOver() && !displayController.getDraw()){
            const winner=document.querySelector('.winner');
            winner.textContent="X is the winner";
        }
    }
    else{
        gameboard.changeArray(position,'o');
        gameboard.render(position,'o');
        displayController.gameEndingCond(gameboard.getArray());
        button.classList.add('o');
        if(displayController.getGameOver() && !displayController.getDraw()){
            const winner=document.querySelector('.winner');
            winner.textContent="O is the winner";
        }
        }
        if(displayController.getDraw()){
            const draw=document.querySelector('.winner');
            draw.textContent="Draw";
        }
        button.disabled=true;
}))

//reset button
const reset=document.querySelector('.reset');
reset.addEventListener('click',()=>{
    const winner=document.querySelector('.winner');
    winner.textContent="";
    displayController.resetGameOver();
    displayController.resetDraw();
    displayController.resetTurn();
    gameboard.resetArray();
    buttons.forEach((button)=>{
    const position= button.getAttribute('position');
    gameboard.render(position,'');
    button.disabled=false;
    button.classList.remove('x');
    button.classList.remove('o');
})
})


