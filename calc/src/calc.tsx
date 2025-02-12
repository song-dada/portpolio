import React, { useState, useRef, useEffect } from 'react';

import Can1 from './Canvas.tsx';
import RtD from '../src/RtoD.tsx';
import Point from '../src/point.tsx';

function SignBtns({ onAddData }) {
    const s = {
        'sin' : 'sin(',
        'cos' : 'cos(',
        'tan' : 'tan(',
        'log' : 'log(',
        'x<sup>n</sup>' : '**',
        'π' : 'π',
        '√' : '√(',
        'AC' : 'AC'
    }
    let btnList:any[] = [];
    for (const key in s) {
        btnList.push( <button className='signBtn' key={'sign' + key}
                    onClick={(e) => {
                    e.preventDefault();
                    onAddData(e.target.value);
                }} value={s[key]} dangerouslySetInnerHTML={{ __html: key }}>
                </button> )
    }
    return <> {btnList} </>;
}

function NumBtns({ onAddData }) {
    const numBtn = ['&#9654;', '(', ')',  '&#xF7;', 7, 8, 9,'&#10005;', 4, 5, 6, '&#45;', 1, 2, 3, '&#43;', 0 ,'00', '.', '&#61;'];
    let btnList:any[] = [];
    for(let value of numBtn){
        if( typeof value === 'number' || value === '00'){
            btnList.push( <button className='numBtn' key={'num' + value}
                onClick={(e) => {
                e.preventDefault();
                onAddData(e.target.value);
                }}value={value} > {value} 
            </button> );

        }else{
            btnList.push( <button className='numBtn sign' key={'num' + value}
                onClick={(e) => {
                e.preventDefault();
                onAddData(e.target.value);
            }} value={value} dangerouslySetInnerHTML={{ __html: value }}>
            </button> );

        }
    }
    return <> {btnList} </>;
}

function Main() {
    const [queue, setQueue] = useState([]);
    const [view, setView] = useState('');
    const [RorD, setRorD] = useState(null);
    const [result, setResult] = useState(null);
    const [result2, setResult2] = useState(null);
    const [point, setPoint] = useState('F');
    const inV = useRef(null);
    useEffect(()=>{

        const showItem=()=>{
            let string: any[]=[]
            for(let val of queue){
                string.push(val);
            }
            setView( string );
        }
        showItem();

        if(result !== null ){ // = 눌렀다면
            let temp = result.toString(); // 결과를 문자열로 변환(자릿수 올림 막기)
            let s1 = temp.split('.'); // 소수점 기준으로 자름
            s1[0] = Number(s1[0]).toLocaleString(); // 앞쪽은 , 붙어야 하니까 넘버타입으로 변환후 , 붙여줌
            if(point === 'F' &&  s1[1] !== undefined){ // 전부 보여야 한다면
                setResult2( s1[0]+'.'+s1[1]); // 결과 반환
            }else if(s1[1] === undefined){
                setResult2( s1[0]); // 결과 반환
            }else{ // 지정 자리만 보여야 된다면
                let printR; // 겨이게 정리
                if(point === '0'){ // 소수점 뒤는 필요 없는경우
                    printR = s1[0]; // 앞자리만 출력
                }else{ // 아니라면
                    printR = s1[0]+'.'+ s1[1].slice(0, point); // 문자열을 잘라서 저장
                }
                setResult2(printR); // 결과 반환
            }
        }
        // console.log(queue)

    },[queue, point, result, result2])
    const handleInput=( value )=>{

        let rexNumber = /[\d00]/; // 입력이 숫자인 경우
        let rexSign = /[x÷+-]/; // 입력이 사칙연산인 경우
        // let rexSign2 = /[&#xF7;]?[&#10005;][&#45;]?[&#43;]?/; // 입력이 사칙연산인 경우
        let rexSign2 = /^(&#xF7;|&#10005;|&#45;|&#43;)$/; // 입력이 사칙연산인 경우
        // console.log(rexSign2.test(value));
        

        if( rexSign2.test(value) ){ // 사칙연산 기호를 입력받으면
            let sign = '';
            switch (value) {
                case '&#xF7;': sign = '÷'; break;
                case '&#10005;': sign = 'x'; break;
                case '&#45;': sign = '-'; break;
                case '&#43;': sign = '+'; break;
            
                default:
                    break;
            }
            setQueue((prev)=> {
                if( rexSign.test( queue[queue.length-1] ) ){ // 이전 입력 값이 사칙연상이라면
                    let prevQueue = [...prev]; // 이전 값을 받아와서
                    prevQueue.pop(); // 기호 제거
                    return [...prevQueue, sign ] // 바뀐 사칙연산으로 반환
                }else{ // 그게 아니라면
                    return [...prev, sign]
                }
            })
        
        }
        else if( value === '&#9654;'){ // 하나 삭제
            setQueue( (prev)=> {
                let prevQ = [...prev]; // 이전값 받고
                prevQ.pop(); // 삭제
                return [...prevQ]; // 반환
            });
        }
        else if( value === 'AC'){ // 모두 지우는 용도이니 내용물 리셋
            setQueue( (prev)=> []);
            setResult( null );
            setResult2( null );
        }
        else if( value === '00'){ // 00 일때.. 이거 손좀 봐야 할듯...
            setQueue( (prev)=>[...queue,'0','0']);
        }
        else if( value === '&#61;'){ // 연산 결과 출력
            resultF();
        }
        else if(queue[queue.length-1] === '**'){
            setQueue( (prev)=>
                // [...queue,'0','0']
                {
                    let newList = [...prev];
                    newList.pop();
                    newList = [...newList, <sup value={value}>{ value }</sup>];
                    return newList;
                }
            );

        }
        else if((value === '.' && queue[queue.length-1] === undefined) // 입력된 값이 없는경우 // 처음부터 . 을 입력하는 경우
            || (value === '.' && rexSign.test( queue[queue.length-1] )) ){ // .앞에 숫자가 아닌 사칙연산일 경우 + . 처럼 입력하는 경우
                setQueue( (prev)=> [...queue, '0.']);
        }
        else if (rexNumber.test(value) || value === '.') { // 입력값이 숫자, 혹은 . 이라면
            setQueue((prev) => {
                let newQueue = [...prev, value]; // 일단 값을 집어 넣고
                let rexNumber = /[\d.]+/; // 숫자와 소수점만 허용
                let ar:any[] = [], i = 0; // 새로운 배열과 인덱스롤 사용할 값을 선언
        
                for (let val of newQueue) { // 반복을 돌리는데
                    if (ar[i] === undefined) { // 선언 값이 없다면
                        ar[i] = ''; // 초기화
                    }
                    if (rexNumber.test(val) || val === '.' || val === ',') { // 숫자 또는 소수점이라면
                        ar[i] += val; // 문자열에 추가
                        // ar[i].join('');
                    } else {
                        i++; // 숫자 입력 이후니까 증가후
                        ar[i] = val; // 연산자 등은 그대로 유지
                        i++; // 기호가 들어간 이후이니 다시 증가
                    }
                };
                let reString:any[] = []; // 이 배열을 반환 함

                for (let val of ar) { // 위에서 설정한 숫자, 문자 구분된 배열의 반복
                    if(typeof(val) === 'string' ){
                        val = val.replace(/,/g, ''); // 숫자(0-9에) ,가 있디면 제거 

                    }

                    if (rexNumber.test(val)) { // 숫자나 소수점이 들어가 있다면
                        
                        let numText; // 숫자 부분을 재설정할 영역
                        if (val.includes('.')) { // 소수점이 포함되어 있다면. * includes('.') '' 안에있는걸 확인하고 t/f로 반환함.
                            let dat = val.split('.'); // 점을 기준으로 분할, 결과 출력시랑 같은 로직
                            
                            // dat[0] = Number(dat[0]).toLocaleString(); // 정수 부분 , 추가
                            numText = dat[0] + '.' + dat[1]; // 소수점 이하 그대로 유지
                        } else {
                            numText = Number(val).toLocaleString(); // 정수만 있을 경우 , 추가
                        }
                        for (let strVal of numText.split('')) { // 결과를 다시 잘라서 배열로 반환하고
                            reString.push(strVal); // 배열의 값을 입력
                        }
                    } else {
                        reString.push(val); // 기호 등은 그대로 유지
                    }
                }
                return [...reString];
            });
        }
        else{ // 위에서 해당하지 않는 sin(.. 애들은 그냥 추가
            setQueue( (prev)=> [...prev, value]);
        }
    }
    const resultF=()=>{
        let s ='';
        // let Reee = queue.filter((item)=>{return item !== undefined})
        for(let val of queue.filter((item)=>{return item !== undefined})){
            // console.log( val )
            let data = 0;
            if(typeof(val) === 'object'){
                data = val.props.value;
                val = 'sup';
            }
            switch (val) {
                case ',': break;
                case 'sin(': 
                    if(RorD === 'degree') {s+= 'Math.sin( (Math.PI / 180) *';}
                    else if (RorD === 'radian'){ s+= 'Math.sin('; }
                break;
                case 'cos(': 
                    if(RorD === 'degree') {s+= 'Math.cos( (Math.PI / 180) *';}
                    else if (RorD === 'radian'){ s+= 'Math.cos('; }
                break;
                case 'tan(': 
                    if(RorD === 'degree') {s+= 'Math.tan( (Math.PI / 180) *';}
                    else if (RorD === 'radian'){ s+= 'Math.tan('; }
                break;
                case 'log(': s+= 'Math.log10('; break;
                case '|(': s+= 'Math.abs('; break;
                case 'π': s+= 'Math.PI'; break;
                case '√(': s+= 'Math.sqrt('; break;
                case '÷': s+= '/'; break;
                case 'x': s+= '*'; break;
                case 'sup': s+= '**'+data; break;
                // case 'x<sup>n</sup>': s+= '**'; break;
                default: s+= val
                    break;
            }
        }

        try {
            // let evalResult = Number(eval(s)); // 계산 결과를 숫자로 반환
            let evalResult = Number(eval(s)); // 계산 결과를 숫자로 반환
            setResult( evalResult ); // 결과 반환
        } catch (error) {
            setResult( 'Error' ); // 오류 생기면 오류로 반환
        }
    }

    

    const getV = (val) =>{ // 자릿수 지정 함수 point.tsx파일과 연결
        setPoint((prev)=> val);
    }

    return (
        <div className="layout" id="layout">
            <div className='cal' id='cal'>
                <div className="values" ref={inV}>
                    {view}
                    <br/>
                    {result2}

                </div>
                <div className="selectA">
                    <div className="rtdA">
                        <RtD onSetDtR={( RorDval )=>{ setRorD( RorDval )}}></RtD>
                    </div>
                    <div className="pointA">
                        <Point onSetPoint={(value)=> getV(value) }/>
                    </div>
                </div>
                <div className='signBtn_area' id='signBtn_area'>
                    <SignBtns onAddData={handleInput} />
                </div>
                <div className='numBtn_area' id='numBtn_area'>
                    <NumBtns onAddData={handleInput} />
                </div>
            </div>
            <div className="canArea">
                <Can1/>
            </div>
        </div>
    );
}

export default Main;
