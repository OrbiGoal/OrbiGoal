import pandas as pd

# Specify the path to your CSV file
csv_file_path = '/path/to/your_csv.csv'

# Read the CSV file with the correct delimiter
df = pd.read_csv(csv_file_path, encoding='ISO-8859-1', delimiter=';')

# Display the DataFrame to check if it's correctly parsed
print(df.head(50))

# Optional: Save the correctly parsed DataFrame to a new excel file
df.to_excel('/path/to/your_xlsx.xlsx', index=False)
