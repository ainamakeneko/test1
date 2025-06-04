import tkinter as tk
from tkinter import messagebox

class EscapeGameUI:
    def __init__(self, master):
        self.master = master
        master.title("Escape Game")

        self.have_key = False

        self.text = tk.Text(master, height=10, width=50, state='disabled')
        self.text.pack(padx=10, pady=10)

        button_frame = tk.Frame(master)
        button_frame.pack(pady=5)

        self.look_button = tk.Button(button_frame, text="Look", command=self.look)
        self.look_button.pack(side='left', padx=5)

        self.take_key_button = tk.Button(button_frame, text="Take Key", command=self.take_key)
        self.take_key_button.pack(side='left', padx=5)

        self.open_door_button = tk.Button(button_frame, text="Open Door", command=self.open_door)
        self.open_door_button.pack(side='left', padx=5)

        self.quit_button = tk.Button(button_frame, text="Quit", command=self.quit_game)
        self.quit_button.pack(side='left', padx=5)

        self.append_text("You are locked in a room. There's a door to the north and a key on the table.")

    def append_text(self, msg):
        self.text.configure(state='normal')
        self.text.insert(tk.END, msg + '\n')
        self.text.configure(state='disabled')
        self.text.see(tk.END)

    def look(self):
        if self.have_key:
            self.append_text("You see the door to the north. You have the key in your hand.")
        else:
            self.append_text("You see a key on the table and a door to the north.")

    def take_key(self):
        if self.have_key:
            self.append_text("You already took the key.")
        else:
            self.have_key = True
            self.append_text("You take the key. Maybe it fits the door.")

    def open_door(self):
        if self.have_key:
            self.append_text("You unlock the door with the key and escape! Congratulations!")
            messagebox.showinfo("Escaped", "You unlocked the door and escaped!")
            self.master.destroy()
        else:
            self.append_text("The door is locked. You need a key.")

    def quit_game(self):
        self.append_text("You give up. Game over.")
        self.master.destroy()


def main():
    root = tk.Tk()
    app = EscapeGameUI(root)
    root.mainloop()

if __name__ == '__main__':
    main()
