import pandas as pd

# Specify the path to your CSV file
csv_file_path = '/Users/lihanlin/Downloads/2022-2023 Football Player Stats.csv'

# Read the CSV file with the correct delimiter
df = pd.read_csv(csv_file_path, encoding='ISO-8859-1', delimiter=';')

# Display the DataFrame to check if it's correctly parsed
print(df.head(50))

# Optional: Save the correctly parsed DataFrame to a new CSV file
df.to_excel('/Users/lihanlin/Downloads/Parsed_Football_Player_Stats_2022-2023.xlsx', index=False)
