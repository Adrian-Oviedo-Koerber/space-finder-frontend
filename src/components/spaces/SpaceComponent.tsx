import { Component, ReactNode } from "react";
import genericImage from '../../assets/genericImage.jpg';

interface SpaceComponentProps {
    spaceId: string,
    name: string,
    location: string,
    photoUrl?: string,
    reserveSpace: (spaceId: string) => void
}

 export class SpaceComponent extends Component <SpaceComponentProps> {
    private renderImage(){
        if (this.props.photoUrl) {
            return <img src={this.props.photoUrl} alt=""/>
        } else {
            return <img src={genericImage} alt=""/>
        }
    }

    render(): ReactNode {
        return <div>
            {this.renderImage()}
            <label>{this.props.name}</label><br/>
            <label>{this.props.spaceId}</label><br/>
            <label>{this.props.location}</label><br/>
            <button onClick={() => this.props.reserveSpace(this.props.spaceId)}>Reserve</button>
        </div>
    }
 }