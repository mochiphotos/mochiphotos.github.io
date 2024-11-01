import os
import json 

# Replace this with the path to your directory
directory_path = '/workspaces/mochiphotos.github.io/photos'

# List all files and directories in the specified path
dir = os.listdir(directory_path)

# Filter out only directories
folders = [item for item in dir if os.path.isdir(os.path.join(directory_path, item))]

# dictionary to hold filder names and content
data = {}

for folder in folders:
   folder_path = os.path.join(directory_path, folder)
   files = [item for item in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, item))]

   # add folder to dictionary 
   data[folder] = files

with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)