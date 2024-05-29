import pandas as pd

# Specify the path to your CSV file
csv_file_path = '/Users/lihanlin/Downloads/2022-2023 Football Team Stats.csv'

# Read the CSV file with the correct delimiter
df = pd.read_csv(csv_file_path, encoding='ISO-8859-1', delimiter=';')

df.index = range(1, len(df) + 1)

# Display the DataFrame to check if it's correctly parsed
print(df.head())

# Optional: Save the correctly parsed DataFrame to a new CSV file
df.to_csv('/Users/lihanlin/Downloads/Parsed_Football_Team_Stats_2022-2023.csv', index=True)
