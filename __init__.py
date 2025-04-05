import os

NODE_CLASS_MAPPINGS = {}

NODE_DISPLAY_NAME_MAPPINGS = {}

__all__ = [
    "NODE_CLASS_MAPPINGS",
    "NODE_DISPLAY_NAME_MAPPINGS",
    "WEB_DIRECTORY",
]

__author__ = """Moooonet"""
__email__ = "moooonet@outlook.com"
__version__ = "1.0.0"

current_directory = os.path.dirname(os.path.abspath(__file__))
WEB_DIRECTORY = os.path.join(current_directory, "web", "js")
