
interface Text{
    text: string;
}


function Dm(props:Text){
    return(<div className="dms">
        <h4 >{props.text}</h4>
      </div>);
}


function MainWindow(){
    return(
        <div className="main_window">
            <ol className="text_list">
                <li>
                    hello
                </li>
                <li>two</li>
            </ol>
        </div>
    );

}

export {Dm, MainWindow};