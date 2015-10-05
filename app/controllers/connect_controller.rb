class ConnectController < ApplicationController
  skip_before_filter :check_terms, :only => [:accept_and_redirect]

  before_filter :check_terms

  def index
    @title = 'My GFW'
    @desc = 'Explore the status of forests worldwide by layering data to create custom maps of forest change, cover, and use.'
    @keywords = 'GFW, map, forest map, visualization, data, forest data, geospatial, gis, geo, spatial, analysis, local data, global data, forest analysis, explore, layer, terrain, alerts, tree, cover, loss, search, country, deforestation'
    @user = user
  end

  private

    def user
      begin
        response = Typhoeus.get("http://auth.gfw-apis.appspot.com/user/session",
            headers: {"Accept" => "application/json"}
        )
        if response.success?
            JSON.parse(response.body)
        else
          nil
        end
      rescue Exception => e
        Rails.logger.error "Error retrieving twitter status: #{e}"
      end
    end
end
