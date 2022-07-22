import * as React from 'react';
import {useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {
    getAllUsers,
    setCurrentPage,
    setSizePage,
    updateUserIsNonLockedById,
    updateUserRolesById
} from "../../../redux/user/UserAction";
import moment from "moment-timezone";
import {Link} from "react-router-dom";

const columns = [
    {id: 'number', label: '№', minWidth: 5, align: 'center'},
    {id: 'firstname', label: 'Firstname', minWidth: 150, align: 'center'},
    {id: 'lastname', label: 'Lastname', minWidth: 150, align: 'center'},
    {id: 'username', label: 'Username', minWidth: 150, align: 'center'},
    {id: 'email', label: 'Email', minWidth: 150, align: 'center'},
    {id: 'registerDate', label: 'Register date', minWidth: 100, align: 'center'},
    {id: 'action', label: 'Action', minWidth: 150, align: 'center'}
];

export default function AllUsersPage() {
    const currentUser = JSON.parse(localStorage.getItem("user"))
    const dispatch = useDispatch()
    const {users, currentPage, sizePage, totalElements} = useSelector(state => state.dataUsers)

    useEffect(() => {
        dispatch(getAllUsers(currentPage, sizePage))
    }, [currentPage, sizePage])

    const handleChangePage = (event, newPage) => {
        dispatch(setCurrentPage(newPage));
    };

    const handleChangeRowsPerPage = (event) => {
        dispatch(setSizePage(+event.target.value));
        dispatch(setCurrentPage(0));
    };

    const updateUserIsNonLocked = (isNonLocked, id) => {
        dispatch(updateUserIsNonLockedById({isNonLocked: isNonLocked}, id))
    }

    const updateUserRoles = (roles, id) => {
        dispatch(updateUserRolesById({roles: roles}, id))
    }

    const showData = (columnId, index, user) => {
        const isAdmin = user.roles.includes("ROLE_ADMIN")

        switch (columnId) {
            case 'number':
                return (<div>{index + 1 + sizePage * currentPage}</div>)
            case 'registerDate':
                return (moment(user.registerDate).format('MMMM D YYYY, h:mm A'))
            case 'action':
                return (
                    <div>
                        <Button
                            style={{minWidth: "100px"}}
                            variant="contained"
                            color={isAdmin ? "error" : "success"}
                            disabled={currentUser.id === user.id}
                            onClick={
                                isAdmin ?
                                    () => updateUserRoles(["ROLE_USER"], user.id) :
                                    () => updateUserRoles(["ROLE_USER", "ROLE_ADMIN"], user.id)
                            }
                        >
                            {isAdmin ? 'Take admin' : 'Give admin'}
                        </Button>{' '}
                        <Button
                            style={{minWidth: "100px"}}
                            variant="contained"
                            color={user.isAccountNonLocked ? "error" : "success"}
                            disabled={currentUser.id === user.id}
                            onClick={
                                user.isAccountNonLocked ?
                                    () => updateUserIsNonLocked(false, user.id) :
                                    () => updateUserIsNonLocked(true, user.id)
                            }
                        >
                            {user.isAccountNonLocked ? 'Block' : 'Unblock'}
                        </Button>
                    </div>
                )
            default:
                return user[columnId]
        }
    }

    return (
        <div>
            <Link to="/administrator" className="my-link">
                <Button variant="contained" color={"error"} style={{marginBottom: "1%"}}>Back</Button>{' '}
            </Link>
            <Paper sx={{width: '100%', overflow: 'hidden'}}>
                <TableContainer sx={{maxHeight: 440}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                    >
                                        <b>{column.label}</b>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                users
                                    .map((row, index) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {columns.map((column) => {
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {showData(column.id, index, row)}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[1, 5, 10, 25]}
                    component="div"
                    count={totalElements}
                    rowsPerPage={sizePage}
                    page={currentPage}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}
