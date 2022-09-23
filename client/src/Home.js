import Input from './Input'
export default function Home(){
    return (
        <div className="home">
            <div className='title' id='title'>
                <h1 style={{color:'black',backgroundColor:'#afd7ee'}}>Real State App!</h1>
            </div>
            <Input />
        </div>
    )
}