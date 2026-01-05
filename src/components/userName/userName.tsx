import "./userName.css"
type Props = {
    userN?:string
}
export default function UserName({userN}:Props) {
    return(
        <div className="user-name">
            <p className="name">{userN}</p>
        </div>
    )
   }