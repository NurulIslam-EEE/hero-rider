import React, { useEffect, useState } from 'react';

const AdminPanel = () => {
    const [user, setUser] = useState();
    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const size = 10;

    useEffect(() => {
        fetch(`https://pacific-shelf-98657.herokuapp.com/users`)
            .then(res => res.json())
            .then(data => {
                setUser(data)
                const count = data.count;
                const pageNumber = Math.ceil(count / size);
                setPageCount(pageNumber)
            })
    }, [])
    return (
        <div>
            <h1>Register User List</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Details</th>
                        <th scope="col">Action</th>

                    </tr>
                </thead>
                <tbody>
                    {user?.map((u, index) => <tr key={u._id}>
                        <th scope="row">{index + 1}</th>
                        <td> <p>Name: {u?.name}</p>
                            <p>Role: {u?.role}</p>
                        </td>
                        <td> <button>Block</button> </td>
                    </tr>
                    )}

                </tbody>
            </table>
            {/* <div className="pagination">
                {[...Array(pageCount).keys()]?.map(number => <button
                    key={number}
                    className={number === page ? 'selected' : ''}
                    onClick={() => setPage(number)}
                >
                    {number + 1}
                </button>)}
        </div> */}
        </div >
    );
};

export default AdminPanel;