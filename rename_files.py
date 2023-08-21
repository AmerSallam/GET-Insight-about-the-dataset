import os

def rename_files_in_directory(directory_path):
    # Get a list of all files in the directory
    file_list = os.listdir(directory_path)
    
    # Sort the file list
    file_list.sort()
    
    # Iterate through the files and rename them
    for index, old_filename in enumerate(file_list, start=1):
        # Create the new filename
        new_filename = f"plot{index}.png"
        
        # Construct the full paths for old and new filenames
        old_filepath = os.path.join(directory_path, old_filename)
        new_filepath = os.path.join(directory_path, new_filename)
        
        # Rename the file
        os.rename(old_filepath, new_filepath)
        
        print(f"Renamed: {old_filename} -> {new_filename}")

# Provide the directory path here
directory_path = "images"
rename_files_in_directory(directory_path)
