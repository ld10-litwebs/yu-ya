require "sinatra"
require "sinatra/reloader" if development?
require 'net/http'


get "/" do
  File.read(File.join('public', 'overlay.html'))
end


get "/calculate" do
  puts params
  escaped_address = URI.escape("http://api.wolframalpha.com/v2/query?input=" + params[:code] + "&appid=GKT33E-6334V5KQLQ")
  uri = URI.parse(escaped_address)
  res = Net::HTTP.get(uri)
  res
end
