**=====PROJECT-ONE======**
**Project requirments**


**User levels**
    =>Admin
        ->Admin can review and pending approve or deny tickets
        ->Admin can log in using username and password
        ->Can previous tickets
    =>User
        ->Can log in using username and password credentials
        ->Users can create reimbursment tickets
        ->Ticket will be in pending state initialy
        ->View previusly created tickets

**Database**
-Users table
    =>Fields:
        -id(pk) ->number
        -username ->string
        -password ->String
        -admin    ->boolean
        -Tickets  ->Map({
            -OpenedBy  ->userid
            -ReviewdBy ->userid(must be admin)
            -Status    ->enum
            -reimbursementAmount ->number
        })
