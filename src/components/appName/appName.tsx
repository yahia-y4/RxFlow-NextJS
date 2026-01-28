import "./appName.css"
type Props = {
    userN?:string
}
export default function AppName({userN}:Props) {
    return(
        <div className="app-name">
            <p className="name">{userN}</p>
        </div>
    )
   }