import builtins
from io import StringIO
from unittest import TestCase
from unittest.mock import patch

import escape_game

class TestEscapeGame(TestCase):
    def run_game_with_inputs(self, inputs):
        """Helper to run main() with predefined inputs and capture output."""
        with patch.object(builtins, "input", side_effect=inputs):
            with patch("sys.stdout", new=StringIO()) as fake_out:
                escape_game.main()
                return fake_out.getvalue()

    def test_quit_immediately(self):
        output = self.run_game_with_inputs(["quit"])
        self.assertIn("You give up. Game over.", output)

    def test_escape_sequence(self):
        output = self.run_game_with_inputs(["look", "take key", "open door"])
        self.assertIn(
            "You unlock the door with the key and escape! Congratulations!", output
        )

    def test_invalid_command(self):
        output = self.run_game_with_inputs(["dance", "quit"])
        self.assertIn("I don't understand that command.", output)
