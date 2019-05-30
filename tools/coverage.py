import json
import os

def main():
    with open('coverage/coverage-final.json') as infile:
        # Import coverage report as a dictionary.
        coverage = json.load(infile)
        for file_name in coverage:
            # Completely remove statements and branches.
            coverage[file_name]["s"].clear()
            coverage[file_name]["b"].clear()
            # Create a line key if it doesn't exist.
            if "l" not in coverage[file_name]:
                coverage[file_name]["l"] = dict()
            # For functions, remove if we can find this function
            # being called from a test file.
            keys = list(coverage[file_name]["f"])
            for fn_num in keys:
                fn_name = coverage[file_name]["fnMap"][fn_num]["name"]
                start_line = coverage[file_name]["fnMap"][fn_num]["loc"]["start"]["line"]
                end_line = coverage[file_name]["fnMap"][fn_num]["loc"]["end"]["line"]
                # If it is an anonymous function, we can't name it.
                if search_in_test(fn_name) or 'anonymous' in fn_name:
                    coverage[file_name]["f"][fn_num] = 1
                    # Add the line numbers to the line field.
                    for line in range(start_line, end_line + 1):
                        coverage[file_name]["l"][line] = 1
                else:
                    for line in range(start_line, end_line + 1):
                        coverage[file_name]["l"][line] = 0


    # Stick the json back into the original file. 
    with open('coverage/coverage-final.json', 'w') as outfile:
        json.dump(coverage, outfile)

# Used for finding a string (or in our case, a function name) in test dir.
def search_in_test(fn_name):
    # Get each file name in test
    for file_name in os.listdir(path='test'):
        # Open that file.
        f = open('test/' + file_name)
        cur_line = f.readline()

        # See if we can find the string in the line.
        while cur_line:
            if cur_line.find(fn_name) != -1:
                return True
            cur_line = f.readline()

    return False

if __name__ == '__main__':
    main()
