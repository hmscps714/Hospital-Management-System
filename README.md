# Medsuite
The purpose of this project is to develop a functioning hospital management system, complete with a database of patients. This management system will simplify the process for  doctors, nurses and medical staff to be able to access patient records, and provide them with the specific care they require as soon as possible. The system will also allow for patients to set up appointments with their preferred practitioner. Hosptial administration is also able to manage all staff and patients through the system, and manage inventory, logistics and financial information as well.

# Usage Guidelines
To use our system, users are first encouraged to sign in to the admin account with the following credentials:

Email:admin@admin.com
Password:

Once signed in, the user is then asked to select "Doctors List", located in the top navbar. From there, the user can then add a doctor, and select their password. The username for the doctor will be the email they submitted in the creation form.

The user can then logout of the Admin page, and sign back in with their newly created Doctor account. Similar to how an Admin creates a Doctor account, the Doctor can select 'Patients List', located in the top navbar, and enter the Patient's details. The username of the patient will be the email given to fill out the creation form, with their password being their date of birth ('YYYYMMDD'). The user can then sign out of the Doctor account, and into the newly created Patient account.

The user now has login access to all three views: an Administrator, a Doctor and a Patient



# Stack
- NextJS, TypeScript
- Firebase backend

# Requirements
[Node](https://nodejs.org/en/) = 18.4.0 

[npm](https://www.npmjs.com/) = 8.12.1

# Important note
In order to access our database, there needs to be an environment variable file. Due to security practices, we cannot share this file online. 

# Installation

```zsh
# 1. Clone the project
$ git clone https://github.com/hmscps714/Hospital-Management-System

# 2. Go into the root folder
$ cd Hospital-Management-System

# 3. Place in the provided .env.local file
# The location of the file should be top level

# 4. Install packages
$ npm install
```

# Start local server

```zsh
$ npm run dev
```
