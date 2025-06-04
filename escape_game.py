import sys

def main():
    print("You are locked in a room. There's a door to the north and a key on the table.")
    have_key = False
    while True:
        command = input("What do you do? (look/take key/open door/quit): ").strip().lower()
        if command == 'look':
            if have_key:
                print("You see the door to the north. You have the key in your hand.")
            else:
                print("You see a key on the table and a door to the north.")
        elif command == 'take key':
            if have_key:
                print("You already took the key.")
            else:
                have_key = True
                print("You take the key. Maybe it fits the door.")
        elif command == 'open door':
            if have_key:
                print("You unlock the door with the key and escape! Congratulations!")
                break
            else:
                print("The door is locked. You need a key.")
        elif command == 'quit':
            print("You give up. Game over.")
            break
        else:
            print("I don't understand that command.")

if __name__ == '__main__':
    main()
