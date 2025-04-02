import React, { useState, useRef, useEffect} from 'react'

function Straight( {count, setCount, delF, addF, onColor, onColorChange}){
    const inValue1 = useRef(null);
    const inValue2 = useRef(null);
    const inColor = useRef(null);
    const pushG = ( ) => {
        if(Number(inValue1.current.value) !== 0 || Number(inValue2.current.value) !== 0){
            setCount(count+1);
            const obj={
                type : 'straight',
                id : `straight${count}`,
                color : inColor.current.value,
                a : Number(inValue1.current.value),
                b : Number(inValue2.current.value),
                f: delF
            }
            addF ((prev)=> [...prev, obj] )
        }
        else{
            console.log('입력 없음')
        }
    }

    return (
        <tr className="additemList">
            <td> f(x) &nbsp; =  </td>
            <td>
                <input type='number' className='graphInV' placeholder='x' ref={inValue1}/>x+
                <input type='number' className='graphInV' placeholder='x' ref={inValue2}/>
            </td>
            <td className="sleletColor">
                <input type="color" ref={inColor} value={onColor} onChange={(e)=>{ onColorChange( e.target.vlaue) }}/>
                {/* <input type="color" ref={inColor} /> */}
            </td>
            <td className="addB">
                <button type="button" onClick={ ()=>{ pushG() }}>Add</button>
            </td>
        </tr>
    )
}
function OneCurve( {count, setCount, delF, addF, onColor, onColorChange}){
    const inValue1 = useRef(null);
    const inValue2 = useRef(null);
    const inValue3 = useRef(null);
    const inColor = useRef(null);
    const pushG = ( ) => {
        if(Number(inValue1.current.value) !== 0
        || Number(inValue2.current.value) !== 0
        || Number(inValue3.current.value) !== 0){

            setCount(count+1);
            const obj={
                    type : 'one-curve',
                    id : `one-curve${count}`,
                    color : inColor.current.value,
                    a : Number(inValue1.current.value),
                    b : Number(inValue2.current.value),
                    c : Number(inValue3.current.value),
                    f: delF
            }
            addF ((prev)=> [...prev, obj] );
        }
    }

    return (
        <tr className="additemList">
            <td> f(x) &nbsp; = </td>
            <td>
                <input type='number' className='graphInV' placeholder='x' ref={inValue1}/>x<sup>2</sup>+
                <input type='number' className='graphInV' placeholder='x' ref={inValue2}/>x+
                <input type='number' className='graphInV' placeholder='x' ref={inValue3}/>
            </td>
            <td className="sleletColor">
                <input type="color" ref={inColor} value={onColor} onChange={(e)=>{ onColorChange( e.target.vlaue) }}/>
                {/* <input type="color" ref={inColor} /> */}
            </td>
            <td className="addB">
                <button type="button" onClick={ ()=>{ pushG() }}>Add</button>
            </td>
        </tr>
    )
}
function TwoCurve( {count, setCount, delF, addF, onColor, onColorChange}){
    const inValue1 = useRef(null);
    const inValue2 = useRef(null);
    const inValue3 = useRef(null);
    const inValue4 = useRef(null);
    const inColor = useRef(null);
    const pushG = ( ) => {
        if(Number(inValue1.current.value) !== 0
        || Number(inValue2.current.value) !== 0
        || Number(inValue3.current.value) !== 0
        || Number(inValue4.current.value) !== 0){
            setCount(count+1);
            const obj={
                    type : 'two-curve',
                    id : `two-curve${count}`,
                    color : inColor.current.value,
                    a : Number(inValue1.current.value),
                    b : Number(inValue2.current.value),
                    c : Number(inValue3.current.value),
                    d : Number(inValue4.current.value),
                    f: delF
            }
            addF ((prev)=> [...prev, obj] )
        }
    }

    return (
        <tr className="additemList">
            <td> f(x) &nbsp; = </td>
            <td>
                <input type='number' className='graphInV' placeholder='x' ref={inValue1}/>x<sup>3</sup>+
                <input type='number' className='graphInV' placeholder='x' ref={inValue2}/>x<sup>2</sup>+
                <input type='number' className='graphInV' placeholder='x' ref={inValue3}/>x+
                <input type='number' className='graphInV' placeholder='x' ref={inValue4}/>
            </td>
            <td className="sleletColor">
                <input type="color" ref={inColor} value={onColor} onChange={(e)=>{ onColorChange( e.target.vlaue) }}/>
                {/* <input type="color" ref={inColor} /> */}
            </td>
            <td className="addB">
                <button type="button" onClick={ ()=>{ pushG() }}>Add</button>
            </td>
        </tr>
    )
}
function ThreeCurve( {count, setCount, delF, addF, onColor, onColorChange}){
    const inValue0 = useRef(null);
    const inValue1 = useRef(null);
    const inValue2 = useRef(null);
    const inValue3 = useRef(null);
    const inValue4 = useRef(null);
    const inColor = useRef(null);
    const pushG = ( ) => {
        if(Number(inValue0.current.value) !== 0
        || Number(inValue1.current.value) !== 0
        || Number(inValue2.current.value) !== 0
        || Number(inValue3.current.value) !== 0
        || Number(inValue4.current.value) !== 0){
            setCount(count+1);
            const obj={
                    type : 'three-curve',
                    id : `three-curve${count}`,
                    color : inColor.current.value,
                    a : Number(inValue0.current.value),
                    b : Number(inValue1.current.value),
                    c : Number(inValue2.current.value),
                    d : Number(inValue3.current.value),
                    e : Number(inValue4.current.value),
                    f: delF
            }
            addF ((prev)=> [...prev, obj] )
        }
    }

    return (
        <tr className="additemList">
            <td> f(x) &nbsp; = </td>
            <td>
                <input type='number' className='graphInV' placeholder='x' ref={inValue0}/>x<sup>4</sup>+
                <input type='number' className='graphInV' placeholder='x' ref={inValue1}/>x<sup>3</sup>+
                <input type='number' className='graphInV' placeholder='x' ref={inValue2}/>x<sup>2</sup>+
                <input type='number' className='graphInV' placeholder='x' ref={inValue3}/>x+
                <input type='number' className='graphInV' placeholder='x' ref={inValue4}/>
            </td>
            <td className="sleletColor">
                <input type="color" ref={inColor} value={onColor} onChange={(e)=>{ onColorChange( e.target.vlaue) }}/>
                {/* <input type="color" ref={inColor} /> */}
            </td>
            <td className="addB">
                <button type="button" onClick={ ()=>{ pushG() }}>Add</button>
            </td>
        </tr>
    )
}
function Circle( {count, setCount, delF, addF, onColor, onColorChange}){
    const inValue1 = useRef(null);
    const inValue2 = useRef(null);
    const inValue3 = useRef(null);
    const inColor = useRef(null);
    const pushG = ( ) => {

        if(Number(inValue3.current.value) !== 0){
            console.log(inValue3.current.value)
            setCount(count+1);
            const obj={
                    type : 'circle',
                    id : `circle${count}`,
                    color : inColor.current.value,
                    x : Number(inValue1.current.value),
                    y : Number(inValue2.current.value),
                    r : Number(inValue3.current.value),
                    f: delF
            }
            addF ((prev)=> [...prev, obj] )
        }
    }
    return (
        <tr className="additemList">
            {/* <td> 원 : </td> */}
            <td>
                <input type='number' className='graphInV' placeholder='r' ref={inValue3}/><sup>2</sup> = 

            </td>
            <td>
                {/* <input type='number' className='graphInV' placeholder='r' ref={inValue3}/><sup>2</sup> =  */}
                (x - <input type='number' className='graphInV' placeholder='x' ref={inValue1}/>)<sup>2</sup>&nbsp;
                (y - <input type='number' className='graphInV' placeholder='y' ref={inValue2}/>)<sup>2</sup>&nbsp;
            </td>
            <td className="sleletColor">
                <input type="color" ref={inColor} value={onColor} onChange={(e)=>{ onColorChange( e.target.vlaue) }}/>
            </td>
            <td className="addB">
                <button type="button" onClick={ ()=>{ pushG() }}>Add</button>
            </td>
        </tr>
    )
}

function DrawGraph(props){
    const [graphList, setGraphList] = useState([]);
    const [count, setCount] = useState(0);
    const [colorVlaue1, setcolorVlaue1] = useState('#000000');
    const [colorVlaue2, setcolorVlaue2] = useState('#ff0000');
    const [colorVlaue3, setcolorVlaue3] = useState('#00ff00');
    const [colorVlaue4, setcolorVlaue4] = useState('#f0f00f');
    const [colorVlaue5, setcolorVlaue5] = useState('#0000ff');
    useEffect(()=>{
        props.onGetData(graphList)

    },[graphList])

    const delItem=( id )=>{
        setGraphList((prevList) => {
            return prevList.filter((object)=>object.id !== id)
        })
    }
    const allD = () => {
        setGraphList((prev)=> [] );
    } 

    return(
        <>
            <div className="delA">
                <button type="button" onClick={ ()=>{ allD() }}>All Delete</button>
            </div>
            <table>
                <Straight count={count} setCount={setCount} delF={delItem} addF={setGraphList} onColor={colorVlaue1} onColorChange={( color )=>{ setcolorVlaue1(color) }}></Straight>
                <OneCurve count={count} setCount={setCount} delF={delItem} addF={setGraphList} onColor={colorVlaue2} onColorChange={( color )=>{ setcolorVlaue2(color) }}></OneCurve>
                <TwoCurve count={count} setCount={setCount} delF={delItem} addF={setGraphList} onColor={colorVlaue3} onColorChange={( color )=>{ setcolorVlaue3(color) }}></TwoCurve>
                <ThreeCurve count={count} setCount={setCount} delF={delItem} addF={setGraphList} onColor={colorVlaue4} onColorChange={( color )=>{ setcolorVlaue4(color) }}></ThreeCurve>
                <Circle count={count} setCount={setCount} delF={delItem} addF={setGraphList} onColor={colorVlaue5} onColorChange={( color )=>{ setcolorVlaue5(color) }}></Circle>
            </table>
                <p className="ps">빈칸은 0으로 취급됩니다.&nbsp; (*원의 경우 반지름(r)을 필히 입력하여 주십시오.)</p>
        </>
    )

}
export default DrawGraph;
