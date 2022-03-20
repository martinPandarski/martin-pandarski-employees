import { DataGrid as MuiDataGrid, } from "@mui/x-data-grid"
import { isEmpty, uniqueId } from "lodash"
import moment from "moment"
import { useMemo, useState } from "react"
import { pairWorkedLongest } from "../../utils/employees"

const columns = [
    { field: "col1", headerName: "EmployeeID #1", width: 150 },
    { field: "col2", headerName: "EmployeeID #2", width: 150 },
    { field: "col3", headerName: "ProjectID", width: 150 },
    { field: "col4", headerName: "Days worked", width: 150 },
]
export default function DataGrid({ data }) {
    const [parsedData, setParsedData] = useState([])
    const [pairs, setPairs] = useState({})
    useMemo(() => {
        setParsedData(data.map(item => {
            let parsedItem = item.split(', ').map((i) => i.trim())
            let parsedNullDate;
            if (parsedItem[3] === 'NULL') {
                parsedNullDate = moment()
            } else {
                parsedNullDate = moment(parsedItem[3])
            }
            return {
                empId: parsedItem[0],
                projectId: parsedItem[1],
                dateFrom: moment(parsedItem[2]),
                dateTo: parsedNullDate,
            }
        }))
        return () => {
            setParsedData([])
        }
    }, [data])
    useMemo(() => {
        if (!isEmpty(parsedData)) {
            setPairs(pairWorkedLongest(parsedData))
        }
    }, [parsedData])

    return (<div style={{ height: '100vh', width: '100%' }}>
        <MuiDataGrid
            components={{
                NoRowsOverlay: () =>
                    <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <p>Не са въведени данни</p>
                    </div>,
            }}
            hideFooterSelectedRowCount
            hideFooterPagination
            disableSelectionOnClick
            disableColumnMenu
            columns={columns}
            rows={
                isEmpty(pairs) ? [] :
                    [{
                        id: uniqueId(),
                        col1: pairs?.employees[0]?.empId,
                        col2: pairs?.employees[1]?.empId,
                        col3: pairs?.employees[0]?.projectId,
                        col4: pairs?.daysWorked,
                    }]
            }
        /></div>)
}