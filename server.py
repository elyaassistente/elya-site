#!/usr/bin/env python3
import http.server
import socketserver
import os
from urllib.parse import unquote

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Decode the path
        path = unquote(self.path)
        
        # Remove query strings
        if '?' in path:
            path = path.split('?')[0]
        
        # If it's a directory or already has an extension, serve as-is
        if path.endswith('/'):
            path = path + 'index.html'
        
        # If no extension, try .html
        if not os.path.splitext(path)[1]:
            html_path = path + '.html'
            full_path = os.path.join(os.getcwd(), html_path.lstrip('/'))
            
            if os.path.isfile(full_path):
                self.path = html_path
        
        # Serve the file
        return super().do_GET()

if __name__ == '__main__':
    PORT = 8001
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    handler = CustomHTTPRequestHandler
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        print(f"Servidor rodando em http://localhost:{PORT}")
        print(f"Diretório: {os.getcwd()}")
        httpd.serve_forever()
