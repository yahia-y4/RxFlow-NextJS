import "./customers.css"
import CustomersForm from "./CustomersForm"
import CustomersList from "./CustomersList"
import CustomersInfo from "./CustomersInfo"
import CustomerDebtsList from "./CustomerDebtsList"
import CustomerPaymentsReceivedList from "./CustomerPaymentsReceivedList"
import EditCustomer from "./EditCustomer"



export default function Customers() {
  return (
    <div className="Customers-page">

        <CustomersForm/>
        <CustomersList/>
        <CustomersInfo/>
        {/* <CustomerDebtsList/>
        <CustomerPaymentsReceivedList/> */}
        {/* <EditCustomer/> */}
   
    </div>
  )
}
