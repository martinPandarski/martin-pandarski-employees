import { DataGrid as MuiDataGrid, } from "@mui/x-data-grid"
import { useMemo, useState } from "react"
import { getEmployeeInfo } from "../../utils/employees"

const columns = [
    { field: "col1", headerName: "EmployeeID #1", width: 150 },
    { field: "col2", headerName: "EmployeeID #2", width: 150 },
    { field: "col3", headerName: "ProjectID", width: 150 },
    { field: "col4", headerName: "Days worked", width: 150 },
]
export default function DataGrid({ data }) {
    const [parsedData, setParsedData] = useState([])
    useMemo(() => {
        setParsedData(data.map(item => {
            let parsedItem = item.split(', ').map((i) => i.trim())
            let parsedNullDate;
            if (parsedItem[3] === 'NULL') {
                parsedNullDate = new Date()
            } else {
                parsedNullDate = parsedItem[3]
            }
            return {
                empId: parsedItem[0],
                projectId: parsedItem[1],
                dateFrom: parsedItem[2],
                dateTo: parsedNullDate,
            }
        }))
        return () => {
            setParsedData([])
        }
    }, [data])
    const rowsData = getEmployeeInfo(parsedData)



    return (<div style={{ height: '100vh', width: '100%' }}><MuiDataGrid disableSelectionOnClick disableColumnMenu columns={columns} rows={
        rowsData.map(row => {
            return {
                id: row.projectId,
                col1: row["empId #1"],
                col2: row["empId #2"],
                col3: row.projectId,
                col4: row.daysWork,
            }
        })
    } /></div>)
}