# ToDoList

## Run the project

- Install node packages: `npm install`
- Start the app: `npm start`
- Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Author

Name: Hallvard Molin Morstøl

## About the application

The application is almost a copy of the assignment 1. I have however skipped some of the features from assignment 1 and added some others to fit the assignment requirements. I use [Material UI](https://mui.com/) for most of the styling. It uses react-router-dom for the routing and the logic for the routing is in app.js. The routing also has access control rules based on the signed in user.

### Sign in

The sign in page is displayed if the user is not already signed in from WebDSL. Username and password are checked on server side and if it is wrong there will be an error message displayed.

### Create user

When the user is not signed in they can create a user. Uniqueness of username is checked server side. Email and password length is checked on client and server side, since JavaScript can be disabled. The password needs to be entered twice to make sure the user does not create a wrong password. It is also possible to see the password if one clicks the eye nex to the text.

### Home page

The home page is displayed when logged in. It displays the users lists. The lists are divided into owner, writer and reader access. From the home page one can create new lists, enter lists and delete lists if one has owner access.

### List page

The list page shows the list name, groups and points in the list. In the list page one can create a group if one has owner or writer access. (I have not added the option to add new points, edit points or delete points/groups which I did in assignment 1). If one has owner access one can click "share access" to give read/write access to another user. If one clicks "change access" one is sent to a page where one can remove access or change between read/write access. An interesting feature of the list page is that it is using the list id in the url using react-router-dom and useParams.

### Profile page

In the profile page a user can change password or email. The user needs to input want they want to change twice. If the values do not match up the save button will be disabled. Passwords are set to hidden mode `******`, but can be shown by clicking a small eye.

### Admin page

If a user has admin access they can see the admin page. The admin page displays the id, name, email, admin access and created time of every user. It uses [@mui/x-data-grid](https://mui.com/components/data-grid/getting-started/). It allows the admin to sort based on all of the values both ASC and DESC. It is also possible to filter or hide values. The admin can also decide how many users per page they want to display. (First I had the data grid using server side paging, but then I also had to implement the sorting and filtering server side which would clash with the assignment tasks.)

### Chart

If the user has admin rights they can access the chart page. The chart page fetches all the users and the number of lists they have created from the server. This data is then displayed in a bart chart. It is a thought of component that makes it easy for the admin to see which users have made a lot of lists. The visualization is using [Highcharts](https://www.highcharts.com/) and the [Highcharts react wrapper](https://github.com/highcharts/highcharts-react).

### Header

The last "main"-component is the header. It is either a plain header with the title when the user is not signed in (Sign in page and create user) or a header with title, signed in info, and buttons to access home, profile, chart, and admin page. Admin and chart page are only displayed for users with admin rights. The header also has a menu button to the left. If that is clicked a side menu is displayed where the user can access all the pages or sign out.
