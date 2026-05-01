
import React from 'react'
import Image from 'next/image'

function MainContent() {
    return (
        <div>
            <div>
                <h1>About Our Company</h1>
                <p>
                    Our system helps manage company activities in an organized way.
                    It allows different users to work based on their roles and
                    responsibilities.
                </p>
                <p>
                    The main goal of this system is to make office management easier,
                    faster, and more secure.
                </p>
                <Image src="/static-images/one.png" alt="main image" width={600} height={400} />
            </div>
            <hr />
            <div>
                <h2>Features and Services</h2>
                <p>
                    Our system provides different features for different types of users.
                    Each user has specific access and tasks.
                </p>
                <div>
                    <h3>Admin</h3>
                    <p>
                        Admin can manage the full system. Admin can add users, remove users,
                        update information, and control system access.
                    </p>
                    <Image src="/static-images/two.png" alt="admin image" width={600} height={400} />
                </div>
                <div>
                    <h3>Manager</h3>
                    <p>
                        Manager can manage employees, assign tasks, check progress, and
                        monitor daily work activities.
                    </p>
                    <Image src="/static-images/three.png" alt="manager image" width={600} height={400} />
                </div>
                <div>
                    <h3>Employee</h3>
                    <p>
                        Employee can view assigned tasks, update task status, submit work,
                        and check personal information.
                    </p>
                    <Image src="/static-images/four.png" alt="employee image" width={600} height={400} />
                </div>
                <div>
                    <h3>Accountant</h3>
                    <p>
                        Accountant can manage salary, payment records, expenses, and
                        financial reports.
                    </p>
                    <Image src="/static-images/five.png" alt="accountant image" width={600} height={400} />
                </div>
            </div>
        </div>
    )
}

export default MainContent