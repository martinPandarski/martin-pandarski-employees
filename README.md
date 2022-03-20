# Pair employees who have worked together

!['Pair-employees-screenshot'](/public/app-screenshot.png)

## How to run the project

1. Clone the repo:

```
https://github.com/martinPandarski/martin-pandarski-employees.git
```

2. Run `npm install` to install the dependencies

3. Run `npm start` to run the project

## The project accepts a `.csv` file in the following format.

| EmployeeId | ProjectId | DateFrom   | DateTo     |
| ---------- | --------- | ---------- | ---------- |
| 123        | 10        | 2013-11-01 | 2013-11-02 |
| 456        | 10        | 2015-11-01 | NULL       |

You won't need to add the header in the file, only the raw data. Each data element in a row must be separated by a comma and a space. All date formats are supported.
