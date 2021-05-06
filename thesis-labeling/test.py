def ignore(ignore):

    with open("sepsis_settings.cfg", "r") as in_file:
        buf = in_file.readlines()

    with open("sepsis_settings.cfg", "w") as out_file:
        for line in buf:
            if line == "--TRACE IGNORED--\n":
                line = line + ignore + "\n"
            out_file.write(line)


if __name__ == "__main__":
    ignore("asdas")